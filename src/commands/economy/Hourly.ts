import Command, { Category } from "../../Command";

export default {
  name: "hourly",
  aliases: [],
  args: false,
  usage: "",
  category: Category.ECONOMY,
  description: "Get your hour's worth",
  cooldown: 3600,
  async execute(message, args, client, users) {
    const amount = Math.round(Math.random() * 20.25 + 20);
    //@ts-ignore
    const user = await users.findOne({
      where: {
        user_id: message.author.id,
      },
    });
    user.increment("balance", {
      by: amount,
    });
    user.save();
    message.channel.send(`You got ${amount} coins!`);
  },
} as Command;
