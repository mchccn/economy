import { MessageEmbed } from "discord.js";
import Command, { Category } from "../../Command";

export default {
    name: "help",
    aliases: ["commands"],
    args: false,
    usage: "[command]",
    description: "Displays all commands and info on a specific command if specified",
    category: Category.UTIL,
    cooldown: 0,
    async execute(message, args, client) {
        const { commands } = client;

        if (!args.length) {
            return message.channel.send(
                new MessageEmbed()
                    .setTitle("Help")
                    .setColor("RANDOM")
                    .setDescription(`Use \`${process.env.PREFIX}help <command>\` for info on a specific command.`)
                    .setFooter(client.user?.tag)
                    .setTimestamp(message.createdAt)
                    .addFields(
                        Object.keys(Category)
                            .filter((key) => !/[0-9]+/.test(key) && key.toLowerCase() !== "dev")
                            .map((cat) => {
                                return {
                                    name: cat.toLowerCase(),
                                    value:
                                        commands
                                            .filter((cmd) => cmd.category === Object(Category)[cat] && cmd.category !== Category.DEV)
                                            .map((cmd) => `\`${cmd.name}\``)
                                            .join(", ") || "None",
                                };
                            })
                    )
            );
        }

        const name = args[0].toLowerCase();
        const command: Command = commands.get(name) || commands.find((c) => c.aliases && c.aliases.includes(name));

        if (!command) {
            message.channel.send(`Couldn't find the command \`${name}\`!`);
            return "invalid";
        }

        return message.channel.send(
            new MessageEmbed()
                .setTitle(`Info for ${command.name}`)
                .setDescription(`If you don't know how to read the argument syntax use \`${process.env.PREFIX}syntax\`.`)
                .addField("Aliases", command.aliases.map((a) => `\`${a}\``).join("\n") || "None")
                .addField("Description", command.description)
                .addField("Usage", `\`${process.env.PREFIX}${command.name} ${command.usage}\``)
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
