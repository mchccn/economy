import Command, { Category } from "../../Command";
import { Users } from "../../dbObjects";

export default {
  name: "coin",
  aliases: ["coinflip", "flip"],
  args: false,
  usage: "[bet]",
  description: "Flip a coin, heads or tails?",
  category: Category.FUN,
  cooldown: 2,
  async execute(message, args, client) {
    const coin = Math.random() > 0.5 ? "Heads!" : "Tails!";

    if (args[0]) {
      const bet = args[0].toLowerCase();

      if (!["h", "t"].includes(bet)) {
        message.channel.send("Bet either `h` or `t`!");
        return "invalid";
      }

      const amount = parseInt(args[1]);

      const user = await Users.findOne({
        where: {
          user_id: message.author.id,
        },
      });

      if (!amount) {
        message.channel.send("Please bet a valid amount!");
        return "invalid";
      }

      if (amount < 5) {
        message.channel.send("You must bet at least 5 coins!");
        return "invalid";
      }

      if (amount > user.balance) {
        message.channel.send("You don't have that much!");
        return "invalid";
      }

      const flip = await message.channel.send("Flipping...");

      return setTimeout(() => {
        flip.edit(coin);
        user[coin[0].toLowerCase() === bet ? "increment" : "decrement"](
          "balance",
          {
            by: amount,
          }
        );
        user.save();
        return message.channel.send(
          coin[0].toLowerCase() === bet
            ? `You were right! You get ${amount} more coins!`
            : `Sorry, you were wrong and lost ${amount} coins.`
        );
      }, Math.floor(Math.random() * 250 + 500));
    }
    return message.channel.send(coin);
  },
} as Command;
