import { Message, MessageEmbed } from "discord.js";
import Command, { Category } from "../../../Command";
import { Users } from "../../../dbObjects";

const suitChars = ["♠️", "♥️", "♣️", "♦️"];
const letters = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

type Card = {
  value: number;
  suit: string;
  name: string;
};

export default {
  name: "blackjack",
  aliases: ["bj"],
  args: false,
  usage: "[bet]",
  category: Category.ECONOMY,
  cooldown: 10,
  description: "Play a game of blackjack",
  async execute(message, args, client) {
    const bet = parseInt(args[0]);

    if (!bet) {
      message.channel.send("Please bet a valid number!");
      return "invalid";
    }

    if (bet < 20) {
      message.channel.send("You must bet at least 20 coins!");
      return "invalid";
    }

    const user = await Users.findOne({
      where: {
        user_id: message.author.id,
      },
    });

    const suits = ["spades", "hearts", "clubs", "diamonds"];

    const cards: Card[] = [];

    const player: Card[] = [];

    const dealer: Card[] = [];

    for (let j = 0; j < suits.length; j++) {
      const suit = suits[j];
      for (let i = 1; i < 14; i++) {
        cards.push({
          value: i > 10 ? 10 : i,
          suit,
          name: `[\`${suitChars[j]} ${
            letters[i - 1]
          }\`](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`,
        });
      }
    }

    for (let i = 0; i < cards.length; i++) {
      const cur = cards[i];
      const rnd = Math.floor(Math.random() * cards.length);
      const tmp = cards[rnd];
      cards[rnd] = cur;
      cards[i] = tmp;
    }

    player.splice(0, -1, ...cards.splice(0, 2));
    dealer.splice(0, -1, ...cards.splice(0, 2));

    async function play(choice: string): Promise<any> {
      if (choice === "hit") {
        const card = cards.splice(0, 1)[0];
        player.splice(0, -1, card);
        if (player.reduce((a, b) => a + b.value, 0) > 21) {
          if (bet) {
            user.decrement("balance", {
              by: bet,
            });
            user.save();
          }
          return message.channel.send(
            new MessageEmbed()
              .setAuthor(
                message.author.username + "'s blackjack game",
                message.author.displayAvatarURL()
              )
              .setTitle(`You bust!`)
              .setDescription(
                `**You drew ${
                  card.name
                } and bust with a total of ${player.reduce(
                  (a, b) => a + b.value,
                  0
                )}**!`
              )
              .addField(
                `${message.author.username}'s cards`,
                `${player
                  .map((c) => c.name)
                  .join(" ")}\nTotal: \`${player.reduce(
                  (a, b) => a + b.value,
                  0
                )}\``,
                true
              )
              .addField(
                "Dealer's cards",
                `${dealer
                  .map((c) => c.name)
                  .join(" ")}\nTotal: \`${dealer.reduce(
                  (a, b) => a + b.value,
                  0
                )}\``,
                true
              )
              .setFooter("Try again!")
              .setColor("RANDOM")
          );
        }
      }

      if (choice === "stand") {
        while (dealer.reduce((a, b) => a + b.value, 0) < 17)
          dealer.splice(0, -1, ...cards.splice(0, 1));

        if (dealer.reduce((a, b) => a + b.value, 0) > 21) {
          user.increment("balance", {
            by: bet,
          });
          user.save();
          return message.channel.send(
            new MessageEmbed()
              .setAuthor(
                message.author.username + "'s blackjack game",
                message.author.displayAvatarURL()
              )
              .setTitle(`Dealer busts!`)
              .setDescription(
                `**The dealer busts with a total of ${dealer.reduce(
                  (a, b) => a + b.value,
                  0
                )}**!`
              )
              .addField(
                `${message.author.username}'s cards`,
                `${player
                  .map((c) => c.name)
                  .join(" ")}\nTotal: \`${player.reduce(
                  (a, b) => a + b.value,
                  0
                )}\``,
                true
              )
              .addField(
                "Dealer's cards",
                `${dealer
                  .map((c) => c.name)
                  .join(" ")}\nTotal: \`${dealer.reduce(
                  (a, b) => a + b.value,
                  0
                )}\``,
                true
              )
              .setFooter("Play again!")
              .setColor("RANDOM")
          );
        }

        const win =
          dealer.reduce((a, b) => a + b.value, 0) <
            player.reduce((a, b) => a + b.value, 0) ||
          dealer.reduce((a, b) => a + b.value, 0) <
            player.reduce((a, b) => a + b.value, 0) +
              (player.some(
                (card: { name: string }) => card.name.split(" ")[0] === "ace"
              )
                ? 10
                : 0);

        if (bet) {
          if (win) {
            user.increment("balance", {
              by: bet,
            });
            user.save();
          } else {
            user.decrement("balance", {
              by: bet,
            });
            user.save();
          }
        }

        return message.channel.send(
          new MessageEmbed()
            .setAuthor(
              message.author.username + "'s blackjack game",
              message.author.displayAvatarURL()
            )
            .setTitle(`You ${win ? "win" : "lose"}!`)
            .setColor("RANDOM")
            .setDescription(
              `\`Dealer : ${dealer.reduce(
                (a, b) => a + b.value,
                0
              )}\nYou    : ${player.reduce((a, b) => a + b.value, 0)}\``
            )
            .addField(
              `${message.author.username}'s cards`,
              `${player.map((c) => c.name).join(" ")}\nTotal: \`${player.reduce(
                (a, b) => a + b.value,
                0
              )}\``,
              true
            )
            .addField(
              "Dealer's cards",
              `${player.map((c) => c.name).join(" ")}\nTotal: \`${dealer.reduce(
                (a, b) => a + b.value,
                0
              )}\``,
              true
            )
            .setFooter("Play again!")
        );
      }

      message.channel.send(
        new MessageEmbed()
          .setAuthor(
            message.author.username + "'s blackjack game",
            message.author.displayAvatarURL()
          )
          .setDescription("Hit or stand? (h/s)")
          .setColor("RANDOM")
          .addField(
            `${message.author.username}'s cards`,
            `${player.map((c) => c.name).join(" ")}\nTotal: \`${player.reduce(
              (a, b) => a + b.value,
              0
            )}\``,
            true
          )
          .addField("Dealer's card", `${dealer[0].name}\nTotal: \`?\``, true)
          .setFooter("K, Q, J = 10 | A = 1 or 11")
      );

      const filter = (response: Message) =>
        response.author.id === message.author.id;

      const playerChoice = (
        await message.channel.awaitMessages(filter, {
          max: 1,
          time: 15000,
          errors: ["time"],
        })
      ).first();

      if (!playerChoice) return message.channel.send("Exiting the game...");

      if (playerChoice.content.toLowerCase().startsWith("h"))
        return play("hit");
      else if (playerChoice.content.toLowerCase().startsWith("s"))
        return play("stand");
      else return message.channel.send("Exiting the game...");
    }

    play("");
  },
} as Command;
