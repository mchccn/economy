import Discord from "discord.js";
import Command, { Category } from "../../Command";
import parseUsers from "../../utils/parseUsers";
import fetch from "node-fetch";
import { literal } from "sequelize";

export default {
  name: "beg",
  aliases: [],
  args: false,
  usage: "",
  category: Category.ECONOMY,
  description: "Beg for money...",
  cooldown: 0,
  async execute(message, args, client, users, shop) {
    const user = await users.findOne({
      where: {
        user_id: message.author.id,
      },
    });

    const deny = Math.random() > 0.8;

    const item = deny
      ? undefined
      : Math.random() > 0.8
      ? await shop.findOne({ order: [[literal("RANDOM()")]] })
      : undefined;

    if (item) user.addItem(item);

    const { first, last } = (
      await (await fetch("https://randomuser.me/api")).json()
    ).results[0].name;

    return message.channel.send(`**${first} ${last}** `);
  },
} as Command;
