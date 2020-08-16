import "module-alias/register";
import express, { Request, Response, NextFunction } from "express";
import * as bodyParser from "body-parser";
import { validationError, internalServerError } from "@core/utils";

import { config } from "@core/config";
import { Telegraf, Extra } from "telegraf";
import { logger } from "./utils/logger";

import { init } from "./commands";
const FormulaParser = require("hot-formula-parser").Parser;
const parser = new FormulaParser();
import Faker from "faker";

const names = new Map([
  ["Дмитриев", "dmitriy"],
  ["Конопацкая", "konopackaya"],
  ["Лукашенко", "badboy"],
  ["Тихоновская", "silentbitch"],
  ["Черечень", "cheman"],
  ["Против всех", "noone"],
]);
const candidates = {
  dmitriy: {
    name: {
      cell: "E2",
      value: "Дмитриев",
    },
    totalPercent: {
      cell: "E3",
    },
    totalCount: {
      cell: "E4",
    },
  },
  konopackaya: {
    name: {
      cell: "F2",
      value: "Конопацкая",
    },
    totalPercent: {
      cell: "F3",
    },
    totalCount: {
      cell: "F4",
    },
  },
  badboy: {
    name: {
      cell: "G2",
      value: "Лукашенко",
    },
    totalPercent: {
      cell: "G3",
    },
    totalCount: {
      cell: "G4",
    },
  },
  silentbitch: {
    name: {
      cell: "H2",
      value: "Тихоновская",
    },
    totalPercent: {
      cell: "H3",
    },
    totalCount: {
      cell: "H4",
    },
  },
  cheman: {
    name: {
      cell: "I2",
      value: "Черечень",
    },
    totalPercent: {
      cell: "I3",
    },
    totalCount: {
      cell: "I4",
    },
  },
  noone: {
    name: {
      cell: "J2",
      value: "Против всех",
    },
    totalPercent: {
      cell: "J3",
    },
    totalCount: {
      cell: "J4",
    },
  },
};

init().then((work) => {
  /**
   *
   */
  parser.on("callCellValue", function (cellCoord: any, done: any) {
    if (work.getCell(cellCoord.label).formula) {
      done(parser.parse(work.getCell(cellCoord.label).formula).result);
    } else {
      done(work.getCell(cellCoord.label).value);
    }
  });

  parser.on("callRangeValue", function (
    startCellCoord: any,
    endCellCoord: any,
    done: any
  ) {
    var fragment = [];

    for (
      var row = startCellCoord.row.index;
      row <= endCellCoord.row.index;
      row++
    ) {
      var colFragment = [];

      for (
        var col = startCellCoord.column.index;
        col <= endCellCoord.column.index;
        col++
      ) {
        colFragment.push(work.getRow(row + 1).getCell(col + 1).value);
      }

      fragment.push(colFragment);
    }

    if (fragment) {
      done(fragment);
    }
  });
  /**
   *
   */
  let candy: keyof typeof candidates;
  let stringOnReply: string = "";
  for (candy in candidates) {
    console.log(work.getCell(candidates[candy].totalPercent.cell).formula);
    console.log(
      parser.parse(work.getCell(candidates[candy].totalPercent.cell).formula)
    );
    stringOnReply += `${candidates[candy].name.value} колл ${
      parser.parse(work.getCell(candidates[candy].totalCount.cell).formula)
        .result
    } процентов ${
      parser.parse(work.getCell(candidates[candy].totalPercent.cell).formula)
        .result
    } %\n`;
    console.log(stringOnReply);
  }

  const bot = new Telegraf(config.botToken);
  bot.start((ctx) => ctx.reply("Welcome!"));
  bot.help((ctx) => ctx.reply("Send me a sticker"));
  bot.on("sticker", (ctx) => ctx.reply("👍"));
  bot.hears("hi", (ctx) => ctx.reply("Hey there"));
  bot.hears("candidate", (ctx) => {
    ctx.replyWithHTML(
      `<b>choose candidate</b>
    `,
      Extra.HTML().markup((m: any) => {
        return m.inlineKeyboard([
          m.callbackButton("Andrei", "adnrei"),
          m.callbackButton("Gaidar", "gaidar"),
        ]);
      })
    );
  });
  bot.action("gaidar", (ctx) =>
    ctx.reply(`developer: action ${Faker.commerce.department()}`)
  );

  bot.hears("candidats", (ctx) => {
    let candy: keyof typeof candidates;
    let stringOnReply: string = "";
    for (candy in candidates) {
      //@ts-ignore
      stringOnReply += `${candidates[candy].name.value} колл ${
        parser.parse(work.getCell(candidates[candy].totalCount.cell).formula)
          .result
      } процентов ${Number.parseFloat(
        //@ts-ignore
        parser.parse(work.getCell(candidates[candy].totalPercent.cell).formula)
          .result * 100
      ).toFixed(2)} %\n`;
    }
    return ctx.replyWithHTML(stringOnReply);
  });

  bot.launch();
});
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
