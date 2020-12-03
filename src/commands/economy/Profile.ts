import { MessageEmbed } from "discord.js";
import { Users } from "../..";
import Command, { Category } from "../../Command";
import parseUsers from "../../utils/parseUsers";

export default {
  name: "profile",
  aliases: [],
  args: false,
  usage: "[user]",
  category: Category.ECONOMY,
  description: "View your balance, or someone else's",
  cooldown: 1,
  async execute(message, args, client) {
    const user = parseUsers(args, message)[0] || message.author;

    const profile = await Users.findOne({
      where: {
        user_id: message.author.id,
      },
    });

    return message.channel.send(
      new MessageEmbed()
        .setTitle(`${user.username}'s profile`)
        .addField("Joined at", profile.createdAt)
        .addField("Total", profile.balance + profile.bank)
        .addField("Multiplier", profile.multiplier)
        .setColor("RANDOM")
        .setThumbnail(
          user.displayAvatarURL({
            dynamic: true,
          })
        )
        .setFooter(client.user?.tag)
        .setTimestamp(message.createdAt)
    );
  },
} as Command;
