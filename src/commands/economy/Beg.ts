import Command, { Category } from "../../Command";
import fetch from "node-fetch";

const replies = [
  "no u",
  "i'm too poor",
  "no thanks",
  "here you g- sike",
  "...",
  "ew go away",
];

export default {
  name: "beg",
  aliases: [],
  args: false,
  usage: "",
  category: Category.ECONOMY,
  description: "Beg for money...",
  cooldown: 15,
  async execute(message, args, client, users, shop) {
    const user = await users.findOne({
      where: {
        user_id: message.author.id,
      },
    });

    const deny = Math.random() > 0.8;

    const item = deny
      ? undefined
      : Math.random() > 0.8
      ? ((a: any[]) => a[Math.floor(Math.random() * a.length)])(
          await shop.findAll({
            where: {
              type: "COLLECTABLE",
            },
          })
        )
      : undefined;

    const coins = deny ? undefined : Math.floor(Math.random() * 5 + 5);

    if (item) user.addItem(item);

    user.balance += coins;
    user.save();

    const { first, last } = (
      await (await fetch("https://randomuser.me/api")).json()
    ).results[0].name;

    return message.channel.send(
      `**${first} ${last}**${
        deny
          ? `: ${replies[Math.floor(Math.random() * replies.length)]}`
          : ` has given <@${message.author.id}> ${coins} coins${
              item ? ` **and one ${item.name}**` : ""
            }!`
      }`
    );
  },
} as Command;
