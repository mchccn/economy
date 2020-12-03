import Discord, { MessageEmbed } from "discord.js";
import { Op } from "sequelize";
import Command, { Category } from "../../Command";

export default {
  name: "buy",
  aliases: ["purchase"],
  args: true,
  usage: "<user> [amount]",
  category: Category.ECONOMY,
  description: "Buy an item, or items.",
  cooldown: 5,
  async execute(message, args, client, users, shop) {
    const item = await shop.findOne({
      where: { name: { [Op.like]: args[0] } },
    });

    const user = await users.findOne({ where: { user_id: message.author.id } });

    if (!item) {
      message.channel.send(`That item doesn't exist.`);
      return "invalid";
    }
    let amount = parseInt(args[1]) || 1;

    if (amount <= 0) {
      message.channel.send("Invalid amount of items to purchase!");
      return "invalid";
    }

    if (["all", "max"].includes(args[1]))
      if (user.balance % item.cost === 0) amount = user.balance / item.cost;
      else amount = Math.floor(user.balance / item.cost);

    const totalCost = item.cost * amount;

    //@ts-ignore
    if (totalCost > user.balance) {
      message.channel.send(
        //@ts-ignore
        `You currently have ${user.balance} coins, but the you need ${totalCost} coins to buy ${amount}!`
      );
      return "invalid";
    }

    //@ts-ignore
    user.decrement("balance", {
      by: totalCost,
    });
    user.save();

    for (let i = 0; i < amount; i++) await user.addItem(item);

    message.channel.send(
      new MessageEmbed()
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
