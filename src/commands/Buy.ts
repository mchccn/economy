import Discord from "discord.js";
import { Op } from "sequelize";
import Command, { Category } from "../Command";
import parseUsers from "../utils/parseUsers";

export default {
  name: "buy",
  aliases: ["purchase"],
  args: true,
  usage: "<user> [amount]",
  category: Category.ECONOMY,
  description: "Buy an item, or items.",
  cooldown: 1,
  async execute(message, args, client, currency, Users, shop) {
    const item = await shop.findOne({
      where: { name: { [Op.like]: args[0] } },
    });

    if (!item) return message.channel.send(`That item doesn't exist.`);

    const amount = parseInt(args[1]) || 1;

    if (amount <= 0)
      return message.channel.send("Invalid amount of items to purchase!");

    const totalCost = item.cost * amount;

    //@ts-ignore
    if (totalCost > currency.getBalance(message.author.id)) {
      return message.channel.send(
        //@ts-ignore
        `You currently have ${currency.getBalance(
          message.author.id
        )}, but the you need ${totalCost} coins to buy ${amount}!`
      );
    }

    const user = await Users.findOne({ where: { user_id: message.author.id } });
    //@ts-ignore
    currency.add(message.author.id, -totalCost);
    await user.addItem(item);

    message.channel.send(`You've bought: ${item.name} ${amount} times.`);
  },
} as Command;
