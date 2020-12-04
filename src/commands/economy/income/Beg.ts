import fetch from "node-fetch";
import { CurrencyShop, Users } from "../../..";
import Command, { Category } from "../../../Command";

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
  async execute(message, args, client) {
    const user = await Users.findOne({
      where: {
        user_id: message.author.id,
      },
    });

    const deny = Math.random() > 0.8;

    const item = deny
      ? undefined
      : Math.random() > 0.8
      ? ((a: any[]) => a[Math.floor(Math.random() * a.length)])(
          await CurrencyShop.findAll({
            where: {
              worth: "SMALL",
            },
          })
        )
      : undefined;

    const coins = deny ? 0 : Math.floor(Math.random() * 5 + 5);

    if (item) user.addItem(item);

    user.income(coins);

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
