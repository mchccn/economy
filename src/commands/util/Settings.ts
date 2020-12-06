import { MessageEmbed } from "discord.js";
import Command, { Category } from "../../Command";
import { prefix } from "../../config.json";
import { Users } from "../../dbObjects";

export default {
  name: "settings",
  aliases: ["config", "cog", "toggle"],
  args: false,
  usage: "[setting] [value]",
  description: "View and change settings",
  category: Category.UTIL,
  cooldown: 2.5,
  async execute(message, args, client) {
    const user = await Users.findOne({
      where: {
        user_id: message.author.id,
      },
    });

    const on = ["on", "yes", "y", "true", "enable"];
    const off = ["off", "no", "n", "false", "disable"];

    if (args[0]) {
      switch (args[0]) {
        case "passive":
          if (on.includes(args[1])) {
            user.passive = true;
            user.save();
            return message.channel.send(
              `Set the \`passive\` setting to \`${args[1]}\``
            );
          } else if (off.includes(args[1])) {
            user.passive = false;
            user.save();
            return message.channel.send(
              `Set the \`passive\` setting to \`${args[1]}\``
            );
          }
          return message.channel.send(
            `Currently set to \`${user.passive ? "on" : "off"}`
          );
        default:
          message.channel.send("That's not a valid setting.");
          return "invalid";
      }
    }

    if (!args.length)
      return message.channel.send(
        new MessageEmbed()
          .setTitle(`${message.author.username}'s settings`)
          .setDescription(
            `Change setting values with \`${prefix}\`settings <setting> <value>`
          )
          .addField(
            "Passive mode",
            `Currently set to \`${
              user.passive ? "on" : "off"
            }\`\n*Passive mode disables commands like \`rob\` but you can't be robbed, either.*`
          )
      );
  },
} as Command;
