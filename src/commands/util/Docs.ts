import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";
import Command, { Category } from "../../Command";
import parseTrim from "../../utils/parseTrim";

export default {
  name: "docs",
  aliases: ["dox", "doc", "documentation"],
  args: true,
  usage: "<platform> <query>",
  category: Category.UTIL,
  description: "Search the discord.js docs",
  cooldown: 2.5,
  async execute(message, args, client) {
    const platform = args[0];
    const query = args.slice(1).join(" ");

    if (!query) return message.channel.send("Please enter a search query!");

    if (["djs", "d.js", "discord.js"].includes(platform)) {
      const res = await fetch(
        `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
          query
        )}`
      );

      const json = await res.json();

      return message.channel.send(
        json ? { embed: json } : "Could not find that term!"
      );
    } else if (["mdn", "moz", "mozilla"].includes(platform)) {
      const res = await fetch(
        `https://developer.mozilla.org/api/v1/search/en-US?q=${encodeURIComponent(
          query
        )}`
      );

      const json = await res.json();

      return message.channel.send(
        new MessageEmbed()
          .setColor("RANDOM")
          .setDescription(
            parseTrim(
              json.documents
                .slice(0, 3)
                .map(
                  (doc: any) =>
                    `**[$${doc.title}](https://developer.mozilla.org/${
                      doc.locale
                    }/docs/${doc.slug})**\n${doc.excerpt.replace(
                      /<\/?mark>/g,
                      ""
                    )}`
                )
                .join("\n\n"),
              2048
            )
          )
          .addField("\u200b", `Search results for \`${query}\``)
          .setAuthor(
            "Mozilla Developer Network [Full results]",
            "https://developer.mozilla.org/static/img/opengraph-logo.72382e605ce3.png",
            `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(
              query
            )}`
          )
      );
    }
  },
} as Command;
