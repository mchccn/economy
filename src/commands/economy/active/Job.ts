import { MessageEmbed } from "discord.js";
import Command, { Category } from "../../../Command";
import { Occupations, Users } from "../../../dbObjects";

export default {
  name: "job",
  aliases: ["work", "jobs"],
  args: false,
  usage: "['list'|'info']",
  category: Category.ECONOMY,
  cooldown: 0,
  description: "Work at your office and earn some income",
  async execute(message, args, client) {
    const user = await Users.findOne({
      where: {
        user_id: message.author.id,
      },
    });

    if (args[0]) {
      switch (args[0]) {
        case "list":
          const occupations = (await Occupations.findAll()).filter(
            (o: any) => o.name !== "unemployed"
          );

          const itemsPerPage = 4;

          const pages = occupations
            .map((_: any, i: any) =>
              i % itemsPerPage
                ? undefined
                : occupations.slice(
                    i,
                    Math.floor(i / itemsPerPage) * itemsPerPage + itemsPerPage
                  )
            )
            .filter(($: any) => !!$);

          const pageNumber = parseInt(args[1]) || 1;

          if (pageNumber > pages.length || pageNumber === 0) {
            message.channel.send(`Enter a valid page (1-${pages.length})!`);
            return "invalid";
          }

          const page =
            pages[
              pageNumber - 1 > pages.length - 1
                ? pages.length - 1
                : pageNumber - 1
            ];

          const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setFooter(client.user?.tag)
            .setTimestamp(message.createdTimestamp)
            .setTitle("Shop");

          for (const occ of page)
            embed.addField(
              occ.name,
              `Level required: \`${occ.level}\`\nSalary: \`${occ.min} – ${occ.max}\``
            );

          message.channel.send(embed);
          break;
        case "info":
          const userOcc = await Occupations.findOne({
            where: {
              name: user.occupation,
            },
          });
          message.channel.send(
            new MessageEmbed()
              .setTitle(`Info for ${message.author.username}'s current job`)
              .addField("Name", userOcc.name)
              .addField("Level required", userOcc.level)
              .addField("Salary", `\`${userOcc.min} – ${userOcc.max}\``)
              .setColor("RANDOM")
              .setFooter(client.user?.tag)
              .setTimestamp(message.createdTimestamp)
          );
          break;
      }
      return "invalid";
    } else {
    }
  },
} as Command;
