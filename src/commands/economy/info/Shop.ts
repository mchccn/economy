import { MessageEmbed } from "discord.js";
import Command, { Category } from "../../../Command";
import { CurrencyShop } from "../../../index";

export default {
  name: "shop",
  aliases: [],
  args: false,
  usage: "[page]",
  category: Category.ECONOMY,
  description: "Visit the shop for items to buy",
  cooldown: 2,
  async execute(message, args, client) {
    const items = await CurrencyShop.findAll();

    const itemsPerPage = 5;

    const pages = items
      .map((_: any, i: any) =>
        i % itemsPerPage
          ? undefined
          : items.slice(
              i,
              Math.floor(i / itemsPerPage) * itemsPerPage + itemsPerPage
            )
      )
      .filter(($: any) => !!$);

    const pageNumber = parseInt(args[0]) || 1;

    if (pageNumber > pages.length || pageNumber === 0) {
      message.channel.send(`Enter a valid page (1-${pages.length})!`);
      return "invalid";
    }

    const page =
      pages[
        pageNumber - 1 > pages.length - 1 ? pages.length - 1 : pageNumber - 1
      ];

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
