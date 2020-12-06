import Command, { Category } from "../../Command";

export default {
  name: "pro",
  aliases: ["professional", "proe"],
  args: false,
  usage: "",
  category: Category.FUN,
  description: "Be professional",
  cooldown: 5,
  async execute(message, args, client) {
    message.channel.send("OwO Pro Gamer sends his regards");
    message.channel.send(":neutral_face:\n:necktie:");
  },
} as Command;
