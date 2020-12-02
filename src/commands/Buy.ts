import Discord from "discord.js";
import { Op } from "sequelize";
import Command, { Category } from "../Command";

export default {
  name: "buy",
  aliases: ["purchase"],
  args: true,
  usage: "<user> [amount]",
  category: Category.ECONOMY,
  description: "Buy an item, or items.",
  cooldown: 5,
  async execute(message, args, client, currency, Users, shop) {
    const item = await shop.findOne({
      where: { name: { [Op.like]: args[0] } },
    });

    const user = await Users.findOne({ where: { user_id: message.author.id } });

    if (!item) return message.channel.send(`That item doesn't exist.`);

    let amount = parseInt(args[1]) || 1;

    if (amount <= 0)
      return message.channel.send("Invalid amount of items to purchase!");

    if (["all", "max"].includes(args[1]))
      if (user.balance % item.cost === 0) amount = user.balance / item.cost;
      else amount = Math.floor(user.balance / item.cost);

    const totalCost = item.cost * amount;

    //@ts-ignore
    if (totalCost > currency.getBalance(message.author.id)) {
      return message.channel.send(
        //@ts-ignore
        `You currently have ${currency.getBalance(
          message.author.id
        )} coins, but the you need ${totalCost} coins to buy ${amount}!`
      );
    }

    //@ts-ignore
    currency.add(message.author.id, -totalCost);

    for (let i = 0; i < amount; i++) await user.addItem(item);

    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle("Thank you for shopping!")
        .setDescription(`code: ${Math.random().toString().slice(2)}`)
        .addField("Item bought", item.name)
        .addField("Amount bought", amount)
        .addField("Total cost", item.cost * amount)
        .setColor("RANDOM")
        .setFooter(client.user?.tag)
        .setTimestamp(message.createdAt)
    );
  },
} as Command;
