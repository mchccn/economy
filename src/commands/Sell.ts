import Discord from "discord.js";
import { Op } from "sequelize";
import Command, { Category } from "../Command";
import parseUsers from "../utils/parseUsers";

export default {
  name: "sell",
  aliases: ["pawn"],
  args: false,
  usage: "<item> <amount>",
  category: Category.ECONOMY,
  description: "View your balance, or someone else's",
  cooldown: 1,
  async execute(message, args, client, currency, users, shop) {
    const item = await shop.findOne({
      where: { name: { [Op.like]: args[0] } },
    });

    const user = await users.findOne({
      where: { user_id: message.author.id },
    });

    if (!item) return message.channel.send(`That item doesn't exist.`);

    let amount = parseInt(args[1]) || 1;

    if (amount <= 0)
      return message.channel.send("Invalid amount of items to sell!");

    const userItem = (await user.getItems()).find(
      (i: any) => i.dataValues.item.name === item.name
    );

    if (userItem.dataValues.amount < amount)
      return message.channel.send("Sorry, but you don't have enough items");

    if (["all", "max"].includes(args[1])) amount = userItem.dataValues.amount;

    const refund = Math.floor(userItem.item.dataValues.cost / 2) * amount;

    user.increment("balance", {
      by: refund,
    });
    user.save();

    userItem.decrement("amount", {
      by: amount,
    });
    userItem.save();

    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle("Refund")
        .setDescription(`code: ${Math.random().toString().slice(2)}`)
        .addField("Item refunded", item.name)
        .addField("Amount of items", amount)
        .addField("Total refunded", refund)
        .setColor("RANDOM")
        .setFooter(client.user?.tag)
        .setTimestamp(message.createdAt)
    );
  },
} as Command;
