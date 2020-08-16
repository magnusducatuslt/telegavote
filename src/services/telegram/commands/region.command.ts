import { TelegrafContext } from "telegraf/typings/context";
import { Telegraf, Extra } from "telegraf";
import {
  LANG_EN,
  LANG_RU,
  BACK_TO_LANG,
  EN_BELARUS,
  EN_WORLD,
} from "../utils/constants";
import { config } from "@core/config";
import fetch from "node-fetch";

export async function routeRegion({ bot }: { bot: Telegraf<TelegrafContext> }) {
  bot.action(EN_WORLD, async (ctx) => {
    try {
      const fetched = await fetch(`${config.exelHost}tgm${EN_WORLD}`);
      const parsed = await fetched.json();
      const data = Buffer.from(parsed.data, "base64");
      ctx.replyWithPhoto({
        source: data,
        filename: parsed.filename,
      });
    } catch (e) {
      ctx.reply(`${EN_WORLD}${e.message}`);
    }
  });

  bot.action(EN_BELARUS, async (ctx) => {
    try {
      const fetched = await fetch(`/tmg/${EN_BELARUS}`);
      const parsed = await fetched.json();
      ctx.replyWithPhoto({
        source: Buffer.from(parsed.data, "base64"),
        filename: parsed.filename,
      });
    } catch (e) {
      ctx.reply(`${EN_BELARUS} ${e.message}`);
    }
  });
}
