import { Message } from "discord.js";
import Command, { Category } from "../../Command";
import { Users } from "../../dbObjects";

export default {
  name: "math",
  aliases: ["question"],
  args: false,
  usage: "[difficulty]",
  description: "Test your math skills",
  category: Category.FUN,
  cooldown: 5,
  async execute(message, args, client) {
    const user = await Users.findOne({
      where: {
        user_id: message.author.id,
      },
    });

    const filter = (response: Message) =>
      response.author.id === message.author.id;

    let calc;
    let reward;

    switch (args[0]) {
      case "genius":
      case "impossible":
        calc = calculate(20);
        reward = 15;
        break;
      case "crazy":
      case "insane":
        calc = calculate(15);
        reward = 12;
        break;
      case "hard":
        calc = calculate(10);
        reward = 7;
        break;
      case "harder":
      case "hard":
        calc = calculate(8);
        reward = 5;
        break;
      case "ezish":
      case "easyish":
      case "ok":
        calc = calculate(5);
        reward = 4;
        break;
      case "ez":
      case "easy":
        calc = calculate(3);
        reward = 3;
        break;
      case "ezpz":
      case "easypeasy":
      default:
        calc = calculate(2);
        reward = 2;
        break;
    }

    message.channel.send(`What is \`${calc?.question}\`?`);
    const choice = (
      await message.channel.awaitMessages(filter, {
        max: 1,
        time: 5000,
        errors: ["time"],
      })
    ).first();
    if (!choice) return "invalid";
    if (parseInt(choice.content) !== calc?.answer)
      return message.channel.send("Sorry, that was incorrect!");
    user.income(reward);
    const responses = [
      "Excellent! You got $ coins.",
      "Good job! I gave you $ coins!",
      "That's right, you earned $ coins.",
      "Nice. You get $ coins as a reward",
    ];
    message.channel.send(
      responses[Math.floor(Math.random() * responses.length)].replace(
        "$",
        reward.toString()
      )
    );
  },
} as Command;

function calculate(length: number) {
  const nums = new Array(length)
    .fill("")
    .map((_) => Math.floor(Math.random() * 8 + 1).toString());

  const ops: any = {
    "＋": "+",
    "－": "-",
    "·": "*",
    "^": "**",
  };

  let lastWasExp = false;

  const operations = nums.slice(1).map((_) => {
    let initial =
      ops[
        Object.keys(ops)[Math.floor(Math.random() * Object.keys(ops).length)]
      ];

    if (initial === "**" && !lastWasExp) {
      lastWasExp = true;
      return initial;
    } else {
      lastWasExp = false;
      while (initial === "**")
        initial =
          ops[
            Object.keys(ops)[
              Math.floor(Math.random() * Object.keys(ops).length)
            ]
          ];
      return initial;
    }
  });

  const expression = [];

  for (let i = 0; i < nums.length + operations.length; i++)
    expression.push(i % 2 === 0 ? nums[i / 2] : operations[(i - 1) / 2]);

  const answer = eval(expression.join(" "));
  const question = expression
    .map(($) =>
      operations.includes($) ? Object.keys(ops).find((o) => ops[o] === $) : $
    )
    .join(" ");

  return {
    answer,
    question,
  };
}
