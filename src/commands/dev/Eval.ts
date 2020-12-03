import Command, { Category } from "../../Command";

export default {
  name: "eval",
  aliases: ["exec"],
  args: true,
  usage: "<code>",
  category: Category.DEV,
  description: "Run some JS",
  cooldown: 0,
  async execute(message, args, client) {
    const code = args.join(" ");

    if (
      code.includes("__dirname") ||
      code.includes("__filename") ||
      code.includes("require") ||
      code.includes("import") ||
      code.includes("global") ||
      code.includes("process")
    )
      return message.channel.send("401 Unauthorized");

    try {
      eval(code);
    } catch (e) {
      return message.channel.send(e.message);
    }
  },
} as Command;
