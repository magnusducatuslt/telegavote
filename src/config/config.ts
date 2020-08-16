import * as Joi from "joi";
import path from "path";
import fs from "fs";
import { configSchema } from "./schemas/config";
import { parse } from "dotenv";

const env = parse(fs.readFileSync(path.resolve(process.cwd(), `.env`)));

const { error, value: envVars } = Joi.validate(env, configSchema);

if (error) {
  throw new Error(`Service API config validation error: ${error.message}`);
}

function normalizeNumber(val: string) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return -1;
  }
  if (port >= 0) {
    return port;
  }
  return 0;
}

const config = {
  env: envVars.NODE_ENV,
  exelHost: envVars.EXEL_HOST,
  botToken: envVars.BOT_TOKEN,
  mail: {
    confirmationURL: `${envVars.AUTH_DOMAIN}${envVars.CONFORMATION_URL}`,
    confirmTemplate: envVars.CONFIRMATION_TEMPLATE,
    deleteCompanyURL: `${envVars.CORE_DOMAIN}${envVars.DELETE_COMPANY_URL}`,
    deleteCompanyTemplate: envVars.DELETE_COMPANY_TEMPLATE,
    forceDeleteCompanyTemplate: envVars.FORCE_DELETE_COMPANY_TEMPLATE,
    inviteUserUrl: `${envVars.CORE_DOMAIN}${envVars.INVITE_USER_URL}`,
    inviteEmployeeUrl: `${envVars.AUTH_DOMAIN}${envVars.INVITE_EMPLOYEE_URL}`,
    inviteUserTemplate: envVars.INVITE_USER_TEMPLATE,
    recoveryPasswordUrl: `${envVars.AUTH_DOMAIN}${envVars.RECOVERY_PASSWORD_URL}`,
    recoveryPasswordTemplate: envVars.RECOVERY_PASSWORD_TEMPLATE,
    changePasswordUrl: `${envVars.AUTH_DOMAIN}${envVars.CHANGE_PASSWORD_URL}`,
    changePasswordTemplate: envVars.CHANGE_PASSWORD_TEMPLATE,
    templates: envVars.MAIL_TEMPLATES,
    mailgun: {
      apiKey: envVars.MAILGUN_APIKEY,
      domain: envVars.MAILGUN_DOMAIN,
      host: "api.eu.mailgun.net",
    },
    nodeMailer: {
      domain: envVars.NODEMAILER_DOMAIN,
      user: envVars.NODEMAILER_USER,
      pass: envVars.NODEMAILER_PASS,
    },
  },
  serverStorage: {
    url: envVars.SERVER_STORAGE,
  },
  storage: {
    port: normalizeNumber(envVars.STORAGE_PORT),
    domain: envVars.STORAGE_DOMAIN,
  },
  core: {
    port: normalizeNumber(envVars.CORE_PORT),
    domain: envVars.CORE_DOMAIN,
  },
  schema: {
    port: normalizeNumber(envVars.SCHEMA_PORT),
    domain: envVars.SCHEMA_DOMAIN,
  },
  auth: {
    domain: envVars.AUTH_DOMAIN,
    port: normalizeNumber(envVars.AUTH_PORT),
  },
  template: {
    domain: envVars.TEMPLATE_DOMAIN,
    port: normalizeNumber(envVars.TEMPLATE_PORT),
  },
  postgres: {
    config: {
      domain: envVars.DATABASE_POSTGRES_DOMAIN,
      user: envVars.DATABASE_POSTGRES_USER,
      database: envVars.DATABASE_POSTGRES_DATABASE,
      password: envVars.DATABASE_POSTGRES_PASSWORD,
      port: normalizeNumber(envVars.DATABASE_POSTGRES_PORT),
    },
    pgadmin: {
      defaultEmail: envVars.DATABASE_PGADMIN_DEFAULT_EMAIL,
      defaultPassword: envVars.DATABASE_PGADMIN_DEFAULT_PASSWORD,
      port: normalizeNumber(envVars.DATABASE_PGADMIN_PORT),
    },
  },
  redis: {
    domain: envVars.DATABASE_REDIS_DOMAIN,
    port: normalizeNumber(envVars.DATABASE_REDIS_PORT),
    tokenExpireHr: normalizeNumber(envVars.DATABASE_REDIS_TOKEN_EXPIRE_HR),
    tokenDeleteCompanyExpireHr: normalizeNumber(
      envVars.DATABASE_REDIS_TOKEN_DELETE_COMPANY_EXPIRE_HR
    ),
    tokenInviteUserExpireHr: normalizeNumber(
      envVars.DATABASE_REDIS_TOKEN_INVITE_USER_EXPIRE_HR
    ),
    tokenRecoveryPasswordExpireHr: normalizeNumber(
      envVars.DATABASE_REDIS_TOKEN_RECOVERY_PASSWORD_EXPIRE_HR
    ),
    tokenChangePasswordExpireHr: normalizeNumber(
      envVars.DATABASE_REDIS_TOKEN_CHANGE_PASSWORD_EXPIRE_HR
    ),
  },
  logs: {
    lvl: envVars.LOGS_LVL,
    format: envVars.LOGS_FORMAT,
    path: envVars.LOGS_PATH,
  },
  elastic: {
    domain: envVars.ELASTICSEARCH_DOMAIN,
    port: normalizeNumber(envVars.ELASTICSEARCH_PORT),
  },
  queue: {
    domain: envVars.QUEUE_REDIS_DOMAIN,
    port: normalizeNumber(envVars.QUEUE_REDIS_PORT),
  },
};

export { config };
