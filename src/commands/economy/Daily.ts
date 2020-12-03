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
    user.increment("balance", {
      by: Math.round(amount * user.multiplier),
    });
    user.increment("max_bank", {
      by: Math.round(50 * user.multiplier),
    });
    user.save();
    message.channel.send(`You got ${amount} coins!`);
  },
} as Command;
