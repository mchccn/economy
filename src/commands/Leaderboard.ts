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
  cooldown: 60,
  async execute(message, args, client, currency, users) {
    if (args.length) {
      if (["me", "i", "pos", "position", "us"].includes(args[0])) {
        return message.channel.send(
          `Your position: \`${
            currency
              .sort((a, b) => b.balance - a.balance)
              .filter((user) => client.users.cache.has(user.user_id))
              .map((u) => u.user_id)
              .indexOf(message.author.id) + 1
          }\``
        );
      }

      const user = parseUsers(args, message)[0];

      if (!user) return message.channel.send("Could not find the user!");

      return message.channel.send(
        `${user?.username}'s position: \`${
          currency
            .sort((a, b) => b.balance - a.balance)
            .filter((user) => client.users.cache.has(user.user_id))
            .map((u) => u.user_id)
            .indexOf(user?.id) + 1
        }\``
      );
    }

    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle("Top Players")
        .setColor("RANDOM")
        .setFooter(client.user?.tag)
        .setTimestamp(message.createdAt)
        .setDescription(
          currency
            .sort((a, b) => b.balance - a.balance)
            .filter((user) => client.users.cache.has(user.user_id))
            .first(10)
            .map(
              (user, position) =>
                `${["🥇", "🥈", "🥉"][position] || "🏅"} ${position + 1} ${
                  client.users.cache.get(user.user_id)!.username
                } - ${user.balance}`
            )
            .join("\n")
        )
    );
  },
} as Command;
