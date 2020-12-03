import { MessageEmbed } from "discord.js";
import Command, { Category } from "../../Command";
import parseUsers from "../../utils/parseUsers";

export default {
  name: "bal",
  aliases: ["balance"],
  args: false,
  usage: "[user]",
  category: Category.ECONOMY,
  description: "View your balance, or someone else's",
  cooldown: 1,
  async execute(message, args, client, users) {
    const target = parseUsers(args, message)[0] || message.author;

    const user = await users.findOne({
      where: {
        user_id: target.id,
      },
    });

    return message.channel.send(
      new MessageEmbed()
        .setTitle(`${target?.username}'s balance`)
        .setColor("RANDOM")
        .setThumbnail(target.displayAvatarURL())
        //@ts-ignore
        .addField("Balance", user.balance)
        .addField(
          "Bank",
          //@ts-ignore
          `${user.bank} / ${user.max_bank}`
        )
        .addField(
          "Total",
          //@ts-ignore
          user.bank + user.balance
        )
        .setFooter(client.user?.tag)
        .setTimestamp(message.createdAt)
    );
  },
} as Command;
