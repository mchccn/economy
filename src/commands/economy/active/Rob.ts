import Command, { Category } from "../../../Command";
import { Users } from "../../../dbObjects";
import parseUsers from "../../../utils/parseUsers";

const thresholds = [
  {
    percent: 0.01,
    message: "a tiny tiny tiny amount",
  },
  {
    percent: 0.02,
    message: "a tiny tiny amount",
  },
  {
    percent: 0.04,
    message: "a small amount",
  },
  {
    percent: 0.08,
    message: "a nice chunk",
  },
  {
    percent: 0.1,
    message: "a good portion",
  },
  {
    percent: 0.2,
    message: "a massive chunk",
  },
  {
    percent: 0.3,
    message: "an insane amount",
  },
  {
    percent: 0.6,
    message: "almost everything",
  },
  {
    percent: 0.9,
    message: "basically everything",
  },
];

export default {
  name: "rob",
  aliases: ["steal"],
  args: true,
  category: Category.ECONOMY,
  cooldown: 60,
  description: "Rob someone!",
  usage: "<user>",
  async execute(message, args, client) {
    const threshold =
      thresholds[Math.floor(Math.random() * Math.random() * thresholds.length)];

    const target = parseUsers(args, message)[0];

    if (!target) {
      message.channel.send("I couldn't find the user!");
      return "invalid";
    }

    const user = await Users.findOne({
      where: {
        user_id: message.author.id,
      },
    });

    const victim = await Users.findOne({
      where: {
        user_id: target.id,
      },
    });

    if (victim.passive)
      return message.channel.send(
        "The victim's passive, leave the wimp alone."
      );

    if (victim.balance < 50)
      return message.channel.send(
        "The victim's too poor, they're not worth the trouble."
      );

    if (user.balance < 50)
      return message.channel.send("You need at least 50 coins to rob someone.");

    if (Math.random() > 0.9) {
      message.channel.send(
        "Some cops caught you and you have to pay the 100 coin fee."
      );
      if (user.balance < 100) {
        user.kill();
        return message.channel.send(
          "You couldn't pay the 100 coin fee and the cops beat you."
        );
      }
      user.decrement("balance", {
        by: 100,
      });
      user.save();
      victim.income(100);
      return message.channel.send(
        "You paid a 100 coin fee to your victim for compensation."
      );
    }

    const amount = Math.floor(victim.balance * threshold.percent);

    victim.decrement("balance", {
      by: amount,
    });
    victim.save();

    user.income(amount);

    return message.channel.send(
      `You robbed ${target.username} and stole **${threshold.message}** from them! (${amount} coins)`
    );
  },
} as Command;
