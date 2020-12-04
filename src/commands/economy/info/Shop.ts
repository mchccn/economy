import { MessageEmbed } from "discord.js";
import Command, { Category } from "../../../Command";
import { CurrencyShop } from "../../../index";

export default {
  name: "shop",
  aliases: ["market", "offers"],
  args: false,
  usage: "[page]",
  category: Category.ECONOMY,
  description: "Visit the shop for items to buy",
  cooldown: 2,
  async execute(message, args, client) {
    const items = await CurrencyShop.findAll();

    const pages = items
      .map((_: any, i: any) =>
        i % 5 ? undefined : items.slice(i, Math.floor(i / 5) * 5 + 5)
      )
      .filter(($: any) => !!$);

    const pageNumber = parseInt(args[0]) || 0;

    const page =
      pages[pageNumber > pages.length - 1 ? pages.length - 1 : pageNumber];

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setFooter(client.user?.tag)
      .setTimestamp(message.createdTimestamp)
      .setTitle("Shop");

    for (const item of page)
      embed.addField(
        `${item.emoji} ${item.name} - ${item.cost}`,
        item.description
      );

    return message.channel.send(embed);
  },
} as Command;
