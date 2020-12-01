import Discord from "discord.js";
import Command, { Category } from "../Command";
import parseUsers from "../utils/parseUsers";

export default {
  name: "shop",
  aliases: ["market", "offers"],
  args: false,
  usage: "[page]",
  category: Category.ECONOMY,
  description: "Visit the shop for items to buy",
  async execute(message, args, client, currency, users, shop) {
    const items = await shop.findAll();
    return message.channel.send(
      items.map((item: any) => `${item.name}: ${item.cost}💰`).join("\n"),
      { code: true }
    );
  },
} as Command;
