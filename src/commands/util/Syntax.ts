import { MessageEmbed } from "discord.js";
import Command, { Category } from "../../Command";

export default {
  name: "syntax",
  aliases: ["args", "params"],
  args: false,
  usage: "",
  description: "Displays a helpful message for reading argument syntax.",
  category: Category.UTIL,
  cooldown: 0,
  async execute(message, args, client) {
    return message.channel.send(
      new MessageEmbed()
        .setTitle("Reading argument syntax")
        .setDescription(
          `<@${client.user?.id}> uses a specific argument syntax. Use this message for future reference. If you still don't get it, join our support server and ask a developer.`
        )
        .addField(
          "Required arguments",
          "`<arg>` indicates that the argument is required. Failure to provide an argument will result in an error message."
        )
        .addField(
          "Optional arguments",
          "`[arg]` indicates that the argument is optional. You may exclude it if you wish, but optional arguments provide more info to the bot.`"
        )
        .addField(
          "Separate prompts",
          "`|` indicates that the bot will prompt you with different messages."
        )
        .addField(
          "Enumerated arguments",
          "`|` inside of `<>` or `[]` indicates that you must choose between the values. For example, `<foo|bar>` means that the argument is required and you must choose either `foo` or `bar`."
        )
        .addField(
          "Listed arguments",
          "`,` represents a list. `[arg, [arg]]` represents an optional argument that can be listed after the first."
        )
        .addField(
          "Persistent arguments",
          "`...` is the persistent operator. `[arg, ...]` is used to represent a list of arguments, all of which are optional."
        )
        .setColor("RANDOM")
    );
  },
} as Command;
