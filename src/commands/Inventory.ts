import Discord from "discord.js";
import Command, { Category } from "../Command";
import parseUsers from "../utils/parseUsers";

export default {
  name: "inv",
  aliases: ["inventory"],
  args: false,
  usage: "[user]",
  category: Category.ECONOMY,
  description: "View your inventory, or someone else's",
  async execute(message, args, client, currency, users) {
    const target = message.mentions.users.first() || message.author;
    //@ts-ignore
    const user = await users.findOne({ where: { user_id: target.id } });
    const items = await user.getItems();

    if (!items.length)
      return message.channel.send(`${target.tag} has nothing!`);

    return message.channel.send(
      `${target.tag} currently has ${items
        .map((i: any) => `${i.amount} ${i.item.name}`)
        .join(", ")}`
    );
  },
} as Command;
