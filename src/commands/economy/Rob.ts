import Command, { Category } from "../../Command";

export default {
  name: "rob",
  aliases: ["steal"],
  args: true,
  category: Category.ECONOMY,
  cooldown: 60,
  description: "Rob someone!",
  usage: "<user>",
  async execute(message, args, client, users) {},
} as Command;
