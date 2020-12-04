import { MessageEmbed } from "discord.js";
import Command, { Category } from "../../../Command";
import { Users } from "../../../dbObjects";
import parseUsers from "../../../utils/parseUsers";

export default {
  name: "profile",
  aliases: [],
  args: false,
  usage: "[user]",
  category: Category.ECONOMY,
  description: "See your profile or someone else's",
  cooldown: 1,
  async execute(message, args, client) {
    const user = parseUsers(args, message)[0] || message.author;

    const profile = await Users.findOne({
      where: {
        user_id: message.author.id,
      },
    });

    const items = await profile.getItems();

    const totalItems =
      items.reduce((acc: any, cur: any) => acc + cur.dataValues.amount, 0) || 0;

    return message.channel.send(
      new MessageEmbed()
        .setTitle(`${user.username}'s profile`)
        .addField("Balance", profile.balance, true)
        .addField("Bank", `${profile.bank} / ${profile.max_bank}`, true)
        .addField("Total", profile.balance + profile.bank, true)
        .addField(
          "Inventory",
          `${totalItems} item${
            totalItems === 1 ? "" : "s"
          } (worth ${items.reduce(
            (acc: any, cur: any) =>
              acc + cur.dataValues.amount * cur.item.dataValues.cost,
            0
          )} coins)`,
          true
        )
        .addField("Multiplier", `${profile.multiplier - 1}%`, true)
        .addField("Passive", profile.passive ? "yes" : "no")
        .addField(
          "Last updated",
          profile.updatedAt.toDateString() === new Date().toDateString()
            ? new Date().toTimeString().slice(8)
            : profile.updatedAt.toDateString(),
          true
        )
        .addField("Joined at", profile.createdAt.toDateString(), true)
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
