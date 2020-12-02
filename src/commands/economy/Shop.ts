import Discord from "discord.js";
import Command, { Category } from "../../Command";
import parseUsers from "../../utils/parseUsers";

export default {
  name: "shop",
  aliases: ["market", "offers"],
  args: false,
  usage: "[page]",
  category: Category.ECONOMY,
  description: "Visit the shop for items to buy",
  cooldown: 2,
  async execute(message, args, client, users, shop) {
    const items = await shop.findAll();

    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setFooter(client.user?.tag)
      .setTimestamp(message.createdTimestamp)
      .setTitle("Shop");

    let shopDesc = "";

    for (const item of items) {
      embed.addField(
        `${item.emoji} ${item.name} - ${item.cost}`,
        item.description
      );
    }

    embed.setDescription(shopDesc);

    return message.channel.send(embed);
  },
} as Command;
