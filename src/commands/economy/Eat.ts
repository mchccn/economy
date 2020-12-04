import { Op } from "sequelize";
import { CurrencyShop, Users } from "../../";
import Command, { Category } from "../../Command";

export default {
  name: "eat",
  aliases: ["devour", "munch"],
  args: true,
  usage: "<item>",
  category: Category.ECONOMY,
  description: "Eat some food for bonuses",
  cooldown: 10,
  async execute(message, args, client) {
    const item = await CurrencyShop.findOne({
      where: { name: { [Op.like]: args[0] } },
    });

    const user = await Users.findOne({
      where: { user_id: message.author.id },
    });

    const userItem = (await user.getItems()).find(
      (i: any) => i.dataValues.item.name === item.name
    );

    if (!userItem || userItem.dataValues.amount <= 0)
      return message.channel.send("You don't have that item!");

    userItem.decrement("amount");
    userItem.save();

    const multiplier = 0.01;

    user.multiplier += multiplier;
    user.save();

    return message.channel.send(
      `You eat your ${item.name.toLowerCase()} and magically gain a ${Math.floor(
        multiplier * 100
      )}% multiplier.`
    );
  },
} as Command;
