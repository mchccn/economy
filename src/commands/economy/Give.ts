import Discord from "discord.js";
import { Op } from "sequelize";
import Command, { Category } from "../../Command";
import parseUsers from "../../utils/parseUsers";

export default {
  name: "give",
  aliases: ["transfer"],
  args: true,
  usage: "<user> <amount> [item]",
  category: Category.ECONOMY,
  description: "Give stuff to someone",
  cooldown: 5,
  async execute(message, args, client, users, shop) {
    const author = await users.findOne({
      where: {
        user_id: message.author.id,
      },
    });
    const currentAmount = author.balance;

    const transferTarget = parseUsers(args, message)[0];

    if (!transferTarget) return message.channel.send("User not found!");

    const target = await users.findOne({
      where: {
        user_id: transferTarget?.id,
      },
    });

    let transferAmount = parseInt(args[1]);

    if (
      (!transferAmount || isNaN(transferAmount)) &&
      !["all", "max"].includes(args[1])
    )
      return message.channel.send(
        `Sorry **${message.author.username}**, that's an invalid amount.`
      );

    if (transferAmount > currentAmount)
      return message.channel.send(
        `Sorry **${message.author.username}**, you only have ${currentAmount}.`
      );

    if (transferAmount <= 0)
      return message.channel.send(
        `Please enter an amount greater than zero, **${message.author.username}**.`
      );

    if (!args[2]) {
      if (["all", "max"].includes(args[1])) transferAmount = author.balance;

      author.decrement("balance", {
        by: transferAmount,
      });
      author.save();
      //@ts-ignore
      target.increment("balance", {
        by: transferAmount,
      });
      target.save();

      return message.channel.send(
        `Successfully transferred ${transferAmount} coin${
          author.balance - transferAmount !== 1 ? "s" : ""
        } to ${
          transferTarget.username
          //@ts-ignore
        }! Your current balance is ${author.balance - transferAmount} coin${
          author.balance - transferAmount !== 1 ? "s" : ""
        }.`
      );
    } else {
      const item = await shop.findOne({
        where: { name: { [Op.like]: args[2] } },
      });

      const userItem = (await author.getItems()).find(
        (i: any) => i.dataValues.item.name === item.dataValues.name
      );

      if (["all", "max"].includes(args[1]))
        transferAmount = userItem.dataValues.amount;

      if (userItem.dataValues.amount < transferAmount)
        return message.channel.send("Sorry, but you don't have enough items");

      let targetItem = (await target.getItems()).find(
        (i: any) => i.dataValues.item.name === userItem.item.dataValues.name
      );

      if (!targetItem) {
        target.addItem(item);
      } else {
        targetItem.increment("amount", {
          by: transferAmount,
        });
        targetItem.save();
      }

      userItem.decrement("amount", {
        by: transferAmount,
      });
      userItem.save();

      return message.channel.send(
        `Successfully transferred ${transferAmount} item${
          transferAmount !== 1 ? "s" : ""
        } to ${
          transferTarget.username
          //@ts-ignore
        }! You have ${userItem.dataValues.amount - transferAmount} item${
          userItem.dataValues.amount - transferAmount !== 1 ? "s" : ""
        } left.`
      );
    }
  },
} as Command;
