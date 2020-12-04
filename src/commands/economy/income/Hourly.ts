import Command, { Category } from "../../../Command";
import { Users } from "../../../dbObjects";

export default {
  name: "hourly",
  aliases: [],
  args: false,
  usage: "",
  category: Category.ECONOMY,
  description: "Get your hour's worth",
  cooldown: 3600,
  async execute(message, args, client) {
    const amount = Math.round(Math.random() * 20.25 + 20);
    const user = await Users.findOne({
      where: {
        user_id: message.author.id,
      },
    });
    user.income(amount);
    message.channel.send(`You got ${amount} coins!`);
  },
} as Command;
