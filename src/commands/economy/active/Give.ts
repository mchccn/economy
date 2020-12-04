import { Op } from "sequelize";
import { CurrencyShop, Users } from "../../..";
import Command, { Category } from "../../../Command";
import parseUsers from "../../../utils/parseUsers";

export default {
  name: "give",
  aliases: ["transfer"],
  args: true,
  usage: "<user> <amount> [item]",
  category: Category.ECONOMY,
  description: "Give stuff to someone",
  cooldown: 5,
  async execute(message, args, client) {
    const author = await Users.findOne({
      where: {
        user_id: message.author.id,
      },
    });
    const currentAmount = author.balance;

    const transferTarget = parseUsers(args, message)[0];

    if (!transferTarget) {
      message.channel.send("User not found!");
      return "invalid";
    }

    const target = await Users.findOne({
      where: {
        user_id: transferTarget?.id,
      },
    });

    let transferAmount = parseInt(args[1]);

    if (
      (!transferAmount || isNaN(transferAmount)) &&
      !["all", "max"].includes(args[1])
    ) {
      message.channel.send(
        `Sorry **${message.author.username}**, that's an invalid amount.`
      );
      return "invalid";
    }

    if (transferAmount > currentAmount) {
      message.channel.send(
        `Sorry **${message.author.username}**, you only have ${currentAmount}.`
      );
      return "invalid";
    }

    if (transferAmount <= 0) {
      message.channel.send(
        `Please enter an amount greater than zero, **${message.author.username}**.`
      );
      return "invalid";
    }

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
      const item = await CurrencyShop.findOne({
        where: { name: { [Op.like]: args[2] } },
      });

      const userItem = (await author.getItems()).find(
        (i: any) => i.dataValues.item.name === item.dataValues.name
      );

      if (["all", "max"].includes(args[1]))
        transferAmount = userItem.dataValues.amount;

      if (userItem.dataValues.amount < transferAmount) {
        message.channel.send("Sorry, but you don't have enough items");
        return "invalid";
      }

      let targetItem = (await target.getItems()).find(
        (i: any) => i.dataValues.item.name === userItem.item.dataValues.name
      );

      if (!targetItem) {
        for (let i = 0; i < transferAmount; i++) target.addItem(item);
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
