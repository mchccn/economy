import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";
import Command, { Category } from "../../Command";
import parseTrim from "../../utils/parseTrim";

export default {
  name: "meme",
  aliases: [],
  args: false,
  usage: "",
  description: "Pulls a random meme out from nowhere",
  category: Category.FUN,
  cooldown: 5,
  async execute(message, args, client) {
    const json = await (
      await fetch("https://meme-api.herokuapp.com/gimme")
    ).json();

    message.channel.send(
      new MessageEmbed()
        .setTitle(parseTrim(json.title, 256))
        .setImage(json.url)
        .setDescription(`From [r/${json.subreddit}](${json.postLink})`)
        .setColor("RANDOM")
        .setFooter(`by ${json.author} | ${json.ups} upvotes`)
    );
  },
} as Command;
