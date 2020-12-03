import Command, { Category } from "../../Command";

export default {
  name: "asdf",
  aliases: ["gibberish", "qwerty"],
  args: false,
  usage: "",
  description: "qwertyuiopasdfghjklzxcvbnm",
  category: Category.FUN,
  cooldown: 5,
  async execute(message, args, client) {
    return message.channel.send(
      new Array(Math.floor(Math.random() * 10 + 20))
        .fill("")
        .map((_) =>
          String.fromCharCode(
            Math.random() > 0.5
              ? Math.random() * 25 + 97
              : Math.random() * 25 + 65
          )
        )
        .join("")
    );
  },
} as Command;
