import Discord from "discord.js";
import Command, { Category } from "../Command";
import parseUsers from "../utils/parseUsers";

export default {
  name: "bal",
  aliases: ["balance"],
  args: false,
  usage: "[user]",
  category: Category.ECONOMY,
  description: "View your balance, or someone else's",
  async execute(message, args, client, currency, users) {
    const target = parseUsers(args, message)[0] || message.author;
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`${target?.username}'s balance`)
        .setColor("RANDOM")
        .setThumbnail(target.displayAvatarURL())
        //@ts-ignore
        .addField("Balance", currency.getBalance(target.id))
        .addField(
          "Bank",
          //@ts-ignore
          `${currency.getBank(target.id)} / ${currency.getMaxBank(target.id)}`
        )
        .addField(
          "Total",
          //@ts-ignore
          currency.getBank(target.id) + currency.getBalance(target.id)
        )
        .setFooter(client.user?.tag)
        .setTimestamp(message.createdAt)
    );
  },
} as Command;
