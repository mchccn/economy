import { MessageEmbed } from "discord.js";
import Command, { Category } from "../../Command";
import parseCase from "../../utils/parseCase";
import parseRoles from "../../utils/parseRoles";
import parseTrim from "../../utils/parseTrim";

export default {
  name: "roleinfo",
  aliases: ["ri"],
  args: true,
  usage: "<role>",
  description: "Displays general role info",
  category: Category.UTIL,
  cooldown: 5,
  async execute(message, args, client) {
    const role = parseRoles(args, message)[0];

    if (!role) {
      message.channel.send("Role not found!");
      return "invalid";
    }

    return message.channel.send(
      new MessageEmbed()
        .setTitle(role.name)
        .addField("Members", role.members.size)
        .addField("Mentionable", role.mentionable, true)
        .addField("Hoisted", role.hoist, true)
        .addField("Color", role.hexColor)
        .addField("Id", role.id, true)
        .addField("Role created", role.createdAt, true)
        .addField("Permissions Integer", role.permissions.bitfield)
        .addField(
          "Permissions",
          parseTrim(
            role.permissions
              .toArray()
              .map((p) => parseCase(p))
              .join("\n"),
            1024
          )
        )
        .setColor(role.color)
        .setFooter(message.author)
        .setTimestamp(message.createdAt)
    );
  },
} as Command;
