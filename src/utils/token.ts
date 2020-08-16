import { TOKEN_DOESNT_EXIST, EMAIL_DOESNT_MATCH } from "@core/utils";
import TokenGenerator from "uuid-token-generator";

const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);

export const generateToken = () => {
  return new Promise<string>((resolve) => {
    resolve(tokgen.generate());
  });
};

export const validateToken = ({
  storedToken,
  receivedToken,
  allowedEmail,
  receivedEmail,
}: {
  storedToken: string;
  receivedToken: string;
  allowedEmail: string;
  receivedEmail: string;
}) => {
  return new Promise((resolve, reject) => {
    if (storedToken === receivedToken) {
      if (allowedEmail === receivedEmail) {
        resolve(true);
      } else reject(EMAIL_DOESNT_MATCH);
    } else reject(TOKEN_DOESNT_EXIST);
  });
};
