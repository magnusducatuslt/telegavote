import * as Joi from "joi";

export const configSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .allow(["development", "production"])
      .default("development"),
    EXEL_HOST: Joi.string().required(),
    MAILGUN_APIKEY: Joi.string().required(),
    MAILGUN_DOMAIN: Joi.string().required(),
    MAIL_TEMPLATES: Joi.string()
      .allow(["local", "mailgun"])
      .default("local")
      .required(),
    NODEMAILER_DOMAIN: Joi.string().required(),
    NODEMAILER_USER: Joi.string().required(),
    NODEMAILER_PASS: Joi.string().required(),
    CONFORMATION_URL: Joi.string().required(),
    CONFIRMATION_TEMPLATE: Joi.string().required(),
    DELETE_COMPANY_URL: Joi.string().required(),
    DELETE_COMPANY_TEMPLATE: Joi.string().required(),
    FORCE_DELETE_COMPANY_TEMPLATE: Joi.string().required(),
    INVITE_USER_URL: Joi.string().required(),
    INVITE_USER_TEMPLATE: Joi.string().required(),
    RECOVERY_PASSWORD_URL: Joi.string().required(),
    RECOVERY_PASSWORD_TEMPLATE: Joi.string().required(),
    CHANGE_PASSWORD_URL: Joi.string().required(),
    CHANGE_PASSWORD_TEMPLATE: Joi.string().required(),
    STORAGE_PORT: Joi.number().required(),
    STORAGE_DOMAIN: Joi.string().required(),
    CORE_PORT: Joi.number().required(),
    CORE_DOMAIN: Joi.string().required(),
    SCHEMA_PORT: Joi.number().required(),
    SCHEMA_DOMAIN: Joi.string().required(),
    AUTH_DOMAIN: Joi.string().required(),
    AUTH_PORT: Joi.number().required(),
    TEMPLATE_DOMAIN: Joi.string().required(),
    TEMPLATE_PORT: Joi.number().required(),
    DATABASE_POSTGRES_DOMAIN: Joi.string().required(),
    DATABASE_POSTGRES_USER: Joi.string().required(),
    DATABASE_POSTGRES_DATABASE: Joi.string().required(),
    DATABASE_POSTGRES_PASSWORD: Joi.string().required(),
    DATABASE_POSTGRES_PORT: Joi.number().required(),
    DATABASE_PGADMIN_DEFAULT_EMAIL: Joi.string().required(),
    DATABASE_PGADMIN_DEFAULT_PASSWORD: Joi.string().required(),
    DATABASE_PGADMIN_PORT: Joi.number().required(),
    DATABASE_REDIS_DOMAIN: Joi.string().required(),
    DATABASE_REDIS_PORT: Joi.number().required(),
    DATABASE_REDIS_TOKEN_EXPIRE_HR: Joi.number().required(),
    DATABASE_REDIS_TOKEN_DELETE_COMPANY_EXPIRE_HR: Joi.number().required(),
    DATABASE_REDIS_TOKEN_INVITE_USER_EXPIRE_HR: Joi.number().required(),
    DATABASE_REDIS_TOKEN_RECOVERY_PASSWORD_EXPIRE_HR: Joi.number().required(),
    DATABASE_REDIS_TOKEN_CHANGE_PASSWORD_EXPIRE_HR: Joi.number().required(),
    LOGS_LVL: Joi.string().required(),
    LOGS_FORMAT: Joi.string().required(),
    LOGS_PATH: Joi.string().required(),
    ELASTICSEARCH_DOMAIN: Joi.string().required(),
    ELASTICSEARCH_PORT: Joi.number().required(),
    QUEUE_REDIS_PORT: Joi.number().required(),
    QUEUE_REDIS_DOMAIN: Joi.string().required(),
    SERVER_STORAGE: Joi.string().required(),
  })
  .unknown()
  .required();
