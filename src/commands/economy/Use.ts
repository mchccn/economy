import { Op } from "sequelize";
import { CurrencyShop, Users } from "../..";
import Command, { Category } from "../../Command";

export default {
  name: "use",
  aliases: [],
  args: true,
  usage: "<item>",
  category: Category.ECONOMY,
  description: "Use an item.",
  cooldown: 15,
  async execute(message, args, client) {
    const user = await Users.findOne({
      where: {
        user_id: message.author.id,
      },
    });

    const item = await CurrencyShop.findOne({
      where: { name: { [Op.like]: args[0] } },
    });

    const userItem = (await user.getItems()).find(
      (i: any) => i.dataValues.item.name === item.dataValues.name
    );

    if (userItem.dataValues.amount < 1 || !userItem) {
      message.channel.send("You don't have that item!");
      return "invalid";
    }

    if (item.type.startsWith("USE")) {
      switch (item.name) {
        case "Magnet":
          const magnetCoins = Math.floor(Math.random() * 5 + 5);
          user.increment("balance", {
            by: magnetCoins,
          });
          user.save();
          return message.channel.send(
            `You found ${magnetCoins} coins with your trusty magnet!`
          );
      }
    } else {
      message.channel.send(
        "You can't use this item!" + item.edible
          ? "\nTo use this item you must eat it!"
          : ""
      );
      return;
    }
  },
} as Command;