import Command, { Category } from "../../Command";

export default {
  name: "choose",
  aliases: ["pick"],
  args: true,
  usage: "<item> <item> [item, [item], ...]",
  description: "Let the bot decide what to choose!",
  category: Category.FUN,
  cooldown: 1,
  async execute(message, args, client) {
    if (!args.length) {
      message.channel.send("No items to pick!");
      return "invalid";
    }

    const string = args.join(" ");

    const items = string.split(",").map((i) => i.trim());

    if (items.length === 1) {
      message.channel.send("There's only one item to pick!");
      return "invalid";
    }

    return message.channel.send(
      `I choose \`${items[Math.floor(Math.random() * items.length)]}\`!`
    );
  },
} as Command;
