import Discord from "discord.js";
import Command, { Category } from "../Command";
import parseUsers from "../utils/parseUsers";

export default {
  name: "leaderboard",
  aliases: ["top"],
  args: false,
  usage: "[user]",
  category: Category.ECONOMY,
  description: "See who's the best",
  async execute(message, args, client, currency, users) {
    if (args.length) {
      if (["me", "i", "pos", "position", "us"].includes(args[0])) {
        return message.channel.send(
          currency
            .sort((a, b) => b.balance - a.balance)
            .filter((user) => client.users.cache.has(user.user_id))
            .map((u) => u.user_id)
            .indexOf(message.author.id) + 1
        );
      }

      const user = parseUsers(args, message)[0];

      return message.channel.send(
        currency
          .sort((a, b) => b.balance - a.balance)
          .filter((user) => client.users.cache.has(user.user_id))
          .map((u) => u.user_id)
          .indexOf(user?.id) + 1
      );
    }

    return message.channel.send(
      currency
        .sort((a, b) => b.balance - a.balance)
        .filter((user) => client.users.cache.has(user.user_id))
        .first(10)
        .map(
          (user, position) =>
            `(${position + 1}) ${client.users.cache.get(user.user_id)!.tag}: ${
              user.balance
            }💰`
        )
        .join("\n"),
      { code: true }
    );
  },
} as Command;
