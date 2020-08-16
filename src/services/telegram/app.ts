import "module-alias/register";
import express, { Request, Response, NextFunction } from "express";
import * as bodyParser from "body-parser";
import { validationError, internalServerError } from "@core/utils";

import { config } from "@core/config";
import { Telegraf, Extra } from "telegraf";
import { logger } from "./utils/logger";

import {
  LANG_EN,
  LANG_RU,
  BACK_TO_LANG,
  EN_BELARUS,
  EN_WORLD,
} from "./utils/constants";

import { routeLanguage, routeRegion } from "./commands";

const bot = new Telegraf(config.botToken);

bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on("sticker", (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));

bot.start((ctx) => {
  ctx.replyWithHTML(
    `<b>Язык/Language</b>
    `,
    Extra.HTML().markup((m: any) => {
      return m.inlineKeyboard([
        m.callbackButton("ru", LANG_RU),
        m.callbackButton("en", LANG_EN),
      ]);
    })
  );
});
routeRegion({ bot });
routeLanguage({ bot });

bot.hears("candidats", (ctx) => {
  let stringOnReply: string = "";

  return ctx.replyWithHTML(stringOnReply);
});

bot.launch();

const app = express();

// Applying logging service
app.use(logger.middleware());
app.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

// Applying CORS for the Swagger
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Parsing JSON request body
app.use(
  bodyParser.json({
    limit: 81920,
  })
);

// // Registering routes
// app.use(routes);

// Handling express-validation errors
app.use(validationError);

// Handling express-validation errors
app.use(internalServerError);

export { app };
