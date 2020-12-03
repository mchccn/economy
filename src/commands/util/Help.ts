import { MessageEmbed } from "discord.js";
import Command, { Category } from "../../Command";
import { prefix } from "../../config.json";

export default {
  name: "help",
  aliases: ["commands"],
  args: false,
  usage: "[command]",
  description:
    "Displays all commands and info on a specific command if specified.",
  category: Category.UTIL,
  cooldown: 0,
  async execute(message, args, client) {
    const { commands } = client;

    if (!args.length) {
      try {
        await message.author.send(
          new MessageEmbed()
            .setTitle("Help")
            .setColor("RANDOM")
            .setDescription(
              `Use \`${prefix}help <command>\` for info on a specific command.`
            )
            .setFooter(client.user?.tag)
            .setTimestamp(message.createdAt)
            .addFields(
              Object.keys(Category)
                .filter((key) => !/[0-9]+/.test(key))
                .map((cat) => {
                  return {
                    name: cat.toLowerCase(),
                    value:
                      commands
                        .filter((cmd) => cmd.category === Object(Category)[cat])
                        .map((cmd) => `\`${cmd.name}\``)
                        .join("\n") || "None",
                  };
                })
            )
        );

        return message.react("✅");
      } catch (e) {
        console.log(e);

        message.channel.send(
          "Couldn't send the message. Do you have DMs disabled?"
        );
        return "invalid";
      }
    }

    const name = args[0].toLowerCase();
    const command: Command =
      commands.get(name) ||
      commands.find((c) => c.aliases && c.aliases.includes(name));

    if (!command) {
      message.channel.send(`Couldn't find the command \`${name}\`!`);
      return "invalid";
    }

    return message.channel.send(
      new MessageEmbed()
        .setTitle(`Info for ${command.name}`)
        .setDescription(
          `Arguments wrapped in \`<>\` are required and arguments wrapped in \`[]\` are optional.\nArguments separated by \`|\` indicates separate prompts.`
        )
        .addField(
          "Aliases",
          command.aliases.map((a) => `\`${a}\``).join("\n") || "None"
        )
        .addField("Description", command.description)
        .addField("Usage", `\`${prefix}${command.name} ${command.usage}\``)
        .addField(
          "Category",
          Object.keys(Category)
            .filter((key) => !/[0-9]+/.test(key))
            .filter((cat) => cat.toLowerCase() === command.category)[0]
            .toLowerCase()
        )
        .setColor("RANDOM")
        .setFooter(client.user?.tag)
        .setTimestamp(message.createdAt)
    );
  },
} as Command;
