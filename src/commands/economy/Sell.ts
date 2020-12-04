import { MessageEmbed } from "discord.js";
import { Op } from "sequelize";
import Command, { Category } from "../../Command";
import { CurrencyShop, Users } from "../../index";

export default {
  name: "sell",
  aliases: ["pawn"],
  args: false,
  usage: "<item> <amount>",
  category: Category.ECONOMY,
  description: "View your balance, or someone else's",
  cooldown: 1,
  async execute(message, args, client) {
    const item = await CurrencyShop.findOne({
      where: { name: { [Op.like]: args[0] } },
    });

    const user = await Users.findOne({
      where: { user_id: message.author.id },
    });

    if (!item) {
      message.channel.send(`That item doesn't exist.`);
      return "invalid";
    }

    let amount = parseInt(args[1]) || 1;

    if (amount <= 0) {
      message.channel.send("Invalid amount of items to sell!");
      return "invalid";
    }

    const userItem = (await user.getItems()).find(
      (i: any) => i.dataValues.item.name === item.name
    );

    if (userItem.dataValues.amount < amount) {
      message.channel.send("Sorry, but you don't have enough items");
      return "invalid";
    }

    if (["all", "max"].includes(args[1])) amount = userItem.dataValues.amount;

    const refund = Math.floor(userItem.item.dataValues.cost / 2) * amount;
    user.income(refund);

    user.increment("balance", {
      by: refund,
    });
    user.save();

    userItem.decrement("amount", {
      by: amount,
    });
    userItem.save();

    return message.channel.send(
      new MessageEmbed()
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
