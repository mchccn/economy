import { MessageEmbed } from "discord.js";
import { Users } from "../../..";
import Command, { Category } from "../../../Command";
import parseUsers from "../../../utils/parseUsers";

export default {
  name: "leaderboard",
  aliases: ["top"],
  args: false,
  usage: "[user]",
  category: Category.ECONOMY,
  description: "See who's the best",
  cooldown: 0,
  async execute(message, args, client) {
    const top = await Users.findAll({
      limit: 10,
      order: [["balance", "DESC"]],
    });

    if (args.length) {
      if (["me", "i", "pos", "position", "us"].includes(args[0])) {
        return message.channel.send(
          `Your position: \`${
            top
              .map((u: any) => u.dataValues.user_id)
              .indexOf(message.author.id) + 1
          }\``
        );
      }

      const user = parseUsers(args, message)[0];

      if (!user) {
        message.channel.send("Could not find the user!");
        return "invalid";
      }

      return message.channel.send(
        `${user?.username}'s position: \`${
          top.map((u: any) => u.dataValues.user_id).indexOf(user?.id) + 1
        }\``
      );
    }

    try {
      return message.channel.send(
        new MessageEmbed()
          .setTitle("Top Players")
          .setColor("RANDOM")
          .setFooter(client.user?.tag)
          .setTimestamp(message.createdAt)
          .setDescription(
            top
              .map(
                (user: any, position: number) =>
                  `${
                    [":first_place:", ":second_place:", ":third_place:"][
                      position
                    ] || ":medal:"
                  } **${user.dataValues.balance}** – ${
                    client.users.cache.get(user.dataValues.user_id)!.username
                  }`
              )
              .join("\n")
          )
      );
    } catch (e) {
      return message.channel.send(
        "Could not load the leaderboard at this time!"
      );
    }
  },
} as Command;
