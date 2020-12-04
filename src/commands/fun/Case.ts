import Command, { Category } from "../../Command";

export default {
  name: "case",
  aliases: ["change"],
  args: true,
  usage: "<case> <statement>",
  description: "Find out...",
  category: Category.FUN,
  cooldown: 2,
  async execute(message, args, client) {
    const _case = args[0];

    const statement = args
      .slice(1)
      .join(" ")
      .replace(/[^a-zA-Z0-9\s]/g, "");

    switch (_case.toLowerCase()) {
      case "crazy":
        return message.channel.send(
          statement
            .split("")
            .map((c: any, i) => (i % 2 ? c.toUpperCase() : c))
            .join("")
        );
      case "camel":
        return message.channel.send(
          statement
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (word: any, index: any) =>
              index === 0 ? word.toLowerCase() : word.toUpperCase()
            )
            .replace(/\s+/g, "")
        );
      case "pascal":
        return message.channel.send(
          statement
            .replace(
              /(\w)(\w*)/g,
              (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase()
            )
            .replace(/\s/g, "")
        );
      case "kebab":
        return message.channel.send(
          statement.replace(/\s+/g, "-").toLowerCase()
        );
      case "snake":
        return message.channel.send(
          statement.replace(/\s+/g, "_").toLowerCase()
        );
      case "macro":
        return message.channel.send(
          statement.replace(/\s+/g, "_").toUpperCase()
        );
      case "squish":
        return message.channel.send(statement.replace(/\s+/g, ""));
      case "all":
        return message.channel.send(
          "All supported cases: `crazy`, `camel`, `pascal`, `kebab`, `snake`, `macro`, `squish`"
        );
      default:
        return message.channel.send("I don't know that case. Sorry!");
    }
  },
} as Command;
