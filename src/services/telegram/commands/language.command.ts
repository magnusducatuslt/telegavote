import { TelegrafContext } from "telegraf/typings/context";
import { Telegraf, Extra } from "telegraf";
import {
  LANG_EN,
  LANG_RU,
  BACK_TO_LANG,
  EN_BELARUS,
  EN_WORLD,
} from "../utils/constants";

export async function routeLanguage({
  bot,
}: {
  bot: Telegraf<TelegrafContext>;
}) {
  bot.action("lang_ru", (ctx) =>
    ctx.replyWithHTML(
      `<b>Выберите регион</b>
`,
      Extra.HTML().markup((m: any) => {
        return m.inlineKeyboard([
          m.callbackButton("Мир", EN_WORLD),
          m.callbackButton("Беларусь", EN_WORLD),
          m.callbackButton("назад", BACK_TO_LANG),
        ]);
      })
    )
  );

  bot.action(LANG_EN, (ctx) =>
    ctx.replyWithHTML(
      `<b>Choose position</b>
`,
      Extra.HTML().markup((m: any) => {
        return m.inlineKeyboard([
          m.callbackButton("World", EN_WORLD),
          m.callbackButton("Belarus", EN_BELARUS),
          m.callbackButton("back", BACK_TO_LANG),
        ]);
      })
    )
  );

  bot.action(BACK_TO_LANG, (ctx) => {
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
}
