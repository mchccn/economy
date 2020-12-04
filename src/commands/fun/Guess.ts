import { Message } from "discord.js";
import Command, { Category } from "../../Command";
import { Users } from "../../dbObjects";

export default {
  name: "guess",
  aliases: [],
  args: false,
  usage: "[bet] | <guess>, ...",
  category: Category.ECONOMY,
  cooldown: 12,
  description: "Guess my chosen number!",
  async execute(message, args, client) {
    const min = Math.round(Math.random() * 10 + 1);
    const max = min + Math.floor(Math.random() * 6 + 10);
    const random = Math.round(Math.random() * (max + 0.01 - min) + min);

    const user = await Users.findOne({
      where: {
        user_id: message.author.id,
      },
    });

    let bet = (parseInt(args[0]) || 0) * 2;

    const filter = (response: Message) =>
      response.author.id === message.author.id;

    message.channel.send(
      `I am thinking of an integer between ${min} and ${max} (inclusive). Guess what it is!`
    );

    async function play(): Promise<any> {
      const choice = (
        await message.channel.awaitMessages(filter, {
          max: 1,
          time: 15000,
          errors: ["time"],
        })
      ).first();

      if (!choice) return "invalid";

      const guess = parseInt(choice.content);

      if (!guess) return message.channel.send("Ending the game...");

      if (guess > random) {
        message.channel.send("Too high! Try again.");
        bet = Math.ceil(bet / 2);
        return play();
      }

      if (guess < random) {
        message.channel.send("Too low! Try again.");
        bet = Math.ceil(bet / 2);
        return play();
      }

      user.increment("balance", {
        by: bet,
      });
      return message.channel.send("You're right! Good job!");
    }

    play();
  },
} as Command;
