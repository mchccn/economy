import { Message, MessageEmbed } from "discord.js";
import { sample, sampleSize } from "lodash";
import Command, { Category } from "../../../Command";
import { Occupations, Users } from "../../../dbObjects";

export default {
  name: "job",
  aliases: ["work", "jobs"],
  args: false,
  usage: "['list'|'info'|'resign']",
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
          return "invalid";
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
          return "invalid";
        case "resign":
          if (user.occupation === "unemployed") {
            message.channel.send("You're already unemployed!");
            return "invalid";
          }
          user.occupation = "unemployed";
          user.save();
          return message.channel.send("You have resigned from your job!");
        default:
          const occupation = await Occupations.findOne({
            where: {
              name: args[0],
            },
          });

          if (user.occupation !== "unemployed") {
            message.channel.send("You have to resign first!");
            return "invalid";
          }

          if (occupation.name === "unemployed") {
            message.channel.send(
              "You can't apply to be unemployed, simply resign!"
            );
            return "invalid";
          }

          if (occupation.name === user.occupation) {
            message.channel.send(`You're already working there!`);
            return "invalid";
          }

          if (!occupation) {
            message.channel.send(`Occupation \`${args[0]}\` not found!`);
          } else {
            if (user.level < occupation.level) {
              message.channel.send(
                `Sorry, you need to be level ${occupation.level} to unlock this job.`
              );
            } else {
              if (user.balance < occupation.min) {
                message.channel.send(
                  `You need ${occupation.min} coins to pay for everything!`
                );
              } else {
                user.decrement("balance", {
                  by: occupation.min,
                });
                message.channel.send(
                  `Congratulations! You are now working as a ${occupation.name}!`
                );
              }
            }
          }

          return "invalid";
      }
    } else {
      const occ = await Occupations.findOne({
        where: {
          name: user.occupation,
        },
      });

      if (occ.name === "unemployed") {
        message.channel.send("You can't work, you're unemployed!");
        return "invalid";
      }

      const game = Math.random() > 0.5;

      const filter = (response: Message) =>
        response.author.id === message.author.id;

      if (game) {
        const scrambles = occ.scramble.split(" ");
        const randWord =
          scrambles[Math.floor(Math.random() * scrambles.length)];
        const scrambled = scramble(randWord);
        message.channel.send(`Unscramble this word: \`${scrambled}\``);

        try {
          const answer = (
            await message.channel.awaitMessages(filter, {
              max: 1,
              time: 10000,
              errors: ["time"],
            })
          ).first();

          if (answer?.content === randWord) {
            const income = Math.round(
              Math.random() * (occ.max - occ.min) + occ.min
            );
            user.income(income);
            message.channel.send(
              `**Boss:** Excellent work, ${message.author.username}! I'm giving you ${income} coins!`
            );
          } else {
            const income = Math.round(occ.min / 2);
            user.income(income);
            message.channel.send(
              `**Boss:** Unacceptable, ${message.author.username}. I'm only giving you ${income} coins.`
            );
          }
        } catch (e) {
          const income = Math.round(occ.min / 2);
          user.income(income);
          message.channel.send(
            `**Boss:** Stop slacking, ${message.author.username}. I'm only giving you ${income} coins.`
          );
        }
      } else {
        const colors = ["red", "orange", "yellow", "green", "blue", "purple"];
        const chosen = sampleSize(colors, 3);
        const words = occ.words.split(" ");
        const chosenWords = sampleSize(words, 3);
        const chosenColor = sample(chosen) || chosen[0];
        const map = new Map();
        for (let i = 0; i < chosen.length; i++)
          map.set(chosen[i], chosenWords[i]);

        const memo = await message.channel.send(
          `Remember the following!\n${Array.from(map)
            .map(([key, value]) => `:${key}_square: – \`${value}\``)
            .join("\n")}`
        );

        setTimeout(async () => {
          memo.edit(`What color was \`${map.get(chosenColor)}\`?`);
          try {
            const answer = (
              await message.channel.awaitMessages(filter, {
                max: 1,
                time: 10000,
                errors: ["time"],
              })
            ).first();

            if (!answer) return;

            if (answer?.content.includes(chosenColor)) {
              const income = Math.round(
                Math.random() * (occ.max - occ.min) + occ.min
              );
              user.income(income);
              message.channel.send(
                `**Boss:** Excellent work, ${message.author.username}! I'm giving you ${income} coins!`
              );
            } else {
              const income = Math.round(occ.min / 2);
              user.income(income);
              message.channel.send(
                `**Boss:** Unacceptable, ${message.author.username}. I'm only giving you ${income} coins.`
              );
            }
          } catch (e) {
            const income = Math.round(occ.min / 2);
            user.income(income);
            message.channel.send(
              `**Boss:** Stop slacking, ${message.author.username}. I'm only giving you ${income} coins.`
            );
          }
        }, 1000);
      }
    }
  },
} as Command;

function scramble(str: string) {
  const strArr = str.split("");
  for (let b = strArr.length - 1; 0 < b; b--) {
    const c = Math.floor(Math.random() * (b + 1));
    const d = strArr[b];
    strArr[b] = strArr[c];
    strArr[c] = d;
  }
  return strArr.join("");
}
