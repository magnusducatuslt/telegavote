/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const { config } = require("dotenv");

config({
  path: path.resolve(__dirname, "src/modules/cache/__tests__/.env"),
});

module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/"],
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(tsx|ts)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "jest-transform-file",
    "^.+\\.svg$": "jest-svg-transformer",
    "\\.(css|less)$": "identity-obj-proxy",
    "^@helpers/(.*)$": "<rootDir>/src/helpers/$1",
    "^@file-system/actions$": "<rootDir>/src/helpers/actions",
    "^@interfaces/redis^":
      "<rootDir>/src/modules/cache/strategies/Redis/interfaces",
    "^@cryptoPackage/argon2$": "<rootDir>/src/helpers/Argon2",
    "^@orm$": "<rootDir>/src/modules/orm",
    "^@helpers$": "<rootDir>/src/helpers",
    "^@strategies/cache$": "<rootDir>/src/modules/cache/strategies",
    "^@strategies/database$": "<rootDir>/src/modules/database/strategies",
    "^@mailserver$": "<rootDir>/src/modules/mail_server",
    "^@core/utils$": "<rootDir>/src/utils/index",
    "^@core/utils/response$": "<rootDir>/src/utils/response",
    "^@core/config$": "<rootDir>/src/config-v2/config",
    "^@core/modules/database$": "<rootDir>/src/modules-v2/database/index",
    "^@core/modules/cache$": "<rootDir>/src/modules-v2/cache/index",
    "^@core/db$": "<rootDir>/src/db-v2/index",
    "^@core/cache$": "<rootDir>/src/cache-v2/index",
    "^@core/mail$": "<rootDir>/src/modules-v2/mail/index",
    "^@core/queue$": "<rootDir>/src/modules-v2/queue",
    "^@core/worker$": "<rootDir>/src/modules-v2/worker",
    "^@core/test/db$": "<rootDir>/src/utils/test/database",
  },
};
