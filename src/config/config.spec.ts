describe("config", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("should export object with correct keys", () => {
    const config = require("./config").config;

    expect(config).toMatchObject({
      env: expect.any(String),
      exelHost: expect.any(String),
      botToken: expect.any(String),
      queue: {
        port: expect.any(Number),
        domain: expect.any(String),
      },
      logs: {
        lvl: expect.any(String),
        format: expect.any(String),
      },
      elastic: {
        domain: expect.any(String),
        port: expect.any(Number),
      },
      mail: {
        confirmationURL: expect.any(String),
        confirmTemplate: expect.any(String),
        deleteCompanyURL: expect.any(String),
        deleteCompanyTemplate: expect.any(String),
        forceDeleteCompanyTemplate: expect.any(String),
        inviteUserUrl: expect.any(String),
        inviteUserTemplate: expect.any(String),
        recoveryPasswordUrl: expect.any(String),
        recoveryPasswordTemplate: expect.any(String),
        changePasswordUrl: expect.any(String),
        changePasswordTemplate: expect.any(String),
        templates: expect.any(String),
        mailgun: {
          apiKey: expect.any(String),
          domain: expect.any(String),
        },
        nodeMailer: {
          domain: expect.any(String),
          user: expect.any(String),
          pass: expect.any(String),
        },
      },
      serverStorage: {
        url: expect.any(String),
      },
      storage: {
        port: expect.any(Number),
        domain: expect.any(String),
      },
      core: {
        port: expect.any(Number),
        domain: expect.any(String),
      },
      auth: {
        domain: expect.any(String),
        port: expect.any(Number),
      },
      postgres: {
        config: {
          domain: expect.any(String),
          user: expect.any(String),
          database: expect.any(String),
          password: expect.any(String),
          port: expect.any(Number),
        },
        pgadmin: {
          defaultEmail: expect.any(String),
          defaultPassword: expect.any(String),
          port: expect.any(Number),
        },
      },
      redis: {
        domain: expect.any(String),
        port: expect.any(Number),
        tokenExpireHr: expect.any(Number),
        tokenDeleteCompanyExpireHr: expect.any(Number),
        tokenInviteUserExpireHr: expect.any(Number),
        tokenRecoveryPasswordExpireHr: expect.any(Number),
      },
    });
  });
});
