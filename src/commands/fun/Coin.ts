import Command, { Category } from "../../Command";

export default {
  name: "coin",
  aliases: ["coinflip", "flip"],
  args: false,
  usage: "",
  description: "Flip a coin, heads or tails?",
  category: Category.FUN,
  cooldown: 2,
  async execute(message, args, client) {
    return message.channel.send(Math.random() > 0.5 ? "Heads!" : "Tails");
  },
} as Command;
