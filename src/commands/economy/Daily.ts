import { Users } from "../..";
import Command, { Category } from "../../Command";

export default {
  name: "daily",
  aliases: [],
  args: false,
  usage: "",
  category: Category.ECONOMY,
  description: "Get your day's worth",
  cooldown: 86400,
  async execute(message, args, client) {
    const amount = Math.round(Math.random() * 50 + 50);
    const user = await Users.findOne({
      where: {
        user_id: message.author.id,
      },
    });
    user.income(amount);
    user.increment("max_bank", {
      by: Math.round(Math.random() * 20 + 40 * user.multiplier),
    });
    user.save();
    message.channel.send(`You got ${amount} coins!`);
  },
} as Command;
