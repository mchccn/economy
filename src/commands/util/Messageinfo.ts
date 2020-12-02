import Discord from "discord.js";
import Command, { Category } from "../../Command";

export default {
  name: "messageinfo",
  aliases: ["mi"],
  args: true,
  usage: "<id>",
  description: "Displays general message info.",
  category: Category.UTIL,
  cooldown: 5,
  async execute(message, args, client) {
    try {
      const ids = args[0].split("-");

      const channel = client.channels.cache.get(ids[0]) as Discord.TextChannel;

      if (!channel) return message.channel.send("Message not found!");

      if (!["text", "news"].includes(channel.type))
        return message.channel.send("I can only retrieve text channels!");

      const msg = await channel.messages.fetch(ids[1]);

      if (!msg) return message.channel.send("Message not found!");

      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle(args[0])
          .setDescription(msg.content)
          .addField("Author", msg.author.tag)
          .addField("Timestamp", msg.createdAt)
          .setColor("RANDOM")
          .setFooter(client.user?.tag)
          .setTimestamp(message.createdAt)
      );
    } catch (e) {
      console.log(e);
      return message.channel.send("Message not found!");
    }
  },
} as Command;
