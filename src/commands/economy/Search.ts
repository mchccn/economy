import { Message } from "discord.js";
import { Users } from "../..";
import Command, { Category } from "../../Command";

const areas = [
  {
    name: "dog",
    money: {
      min: 2,
      max: 10,
    },
    chanceOfDying: 0.01,
    reply: `You search through a stray dog's fur and somehow find $money$ coins hidden away.`,
    deathReply:
      "The dog bites you, but at least it didn't have rabies. Oh wait it does.",
  },
  {
    name: "person",
    money: {
      min: 5,
      max: 18,
    },
    chanceOfDying: 0.04,
    reply: `You snatch a wallet with $money$ coins away from a person. Did you just steal?`,
    deathReply: "The person was a cop, and he shot you for self-defense.",
  },
  {
    name: "bushes",
    money: {
      min: 4,
      max: 12,
    },
    chanceOfDying: 0.03,
    reply: `Crawling in the bushes results in rashes... and $money$ coins?`,
    deathReply:
      "You got rashes from a poison bush and died from scratching yourself too much.",
  },
  {
    name: "hole",
    money: {
      min: 5,
      max: 20,
    },
    chanceOfDying: 0.06,
    reply: `In the hole in the ground there lived $money$ coins. (*The Hobbit*  reference)`,
    deathReply: "The hole collapses and buries you alive.",
  },
  {
    name: "farm",
    money: {
      min: 6,
      max: 16,
    },
    chanceOfDying: 0.05,
    reply: `Sifting through manure is not pretty, but you somehow found $money$ coins.`,
    deathReply: "While searching the farm, the walls collapse and you die.",
  },
  {
    name: "couch",
    money: {
      min: 7,
      max: 9,
    },
    chanceOfDying: 0.02,
    reply: `You find $money$ coins in your couch.... How long has that been sitting there?`,
    deathReply: "You get stuck in the couch and suffocate...?",
  },
  {
    name: "bed",
    money: {
      min: 10,
      max: 12,
    },
    chanceOfDying: 0.05,
    reply: `You crawl under your bed and find $money$ coins lying around.`,
    deathReply: "The bed sadly falls on you while you snoop under it.",
  },
  {
    name: "dresser",
    money: {
      min: 12,
      max: 22,
    },
    chanceOfDying: 0.04,
    reply: `The drawers had $money$ coins in it. What are you doing?`,
    deathReply:
      "You pull a drawer so hard that you knock yourself out of the world.",
  },
  {
    name: "fridge",
    money: {
      min: 5,
      max: 18,
    },
    chanceOfDying: 0.02,
    reply: `You find a rotten sandwich and $money$ coins in your fridge`,
    deathReply: "The fridge door snaps shut and you get stuck inside.",
  },
  {
    name: "shack",
    money: {
      min: 17,
      max: 30,
    },
    chanceOfDying: 0.1,
    reply: `You swing open the creak door and find $money$ coins at your feet.`,
    deathReply: "The shack comes to life and eats you whole.",
  },
  {
    name: "clubhouse",
    money: {
      min: 1,
      max: 30,
    },
    chanceOfDying: 0.065,
    reply: `You join the clubhouse and gain $money$ coins from the point system(?).`,
    deathReply: "You went to the nightclub instead.",
  },
  {
    name: "bank",
    money: {
      min: 30,
      max: 60,
    },
    chanceOfDying: 0.25,
    reply: `You rob your local bank and get $money$ coins as the payout. Run!`,
    deathReply: "You got shot while trying to run away.",
  },
  {
    name: "mailbox",
    money: {
      min: 10,
      max: 12,
    },
    chanceOfDying: 0.01,
    reply: `$money$ coins were waiting for you. Someone's nice at least.`,
    deathReply: "Over 100 bills flow out and drown you in debt.",
  },
  {
    name: "piggybank",
    money: {
      min: 0,
      max: 100,
    },
    chanceOfDying: 0.01,
    reply: `You find $money$ in your piggybank from when you were a kid...`,
    deathReply: "The piggybank shatters and the porcelain cuts you.",
  },
  {
    name: "cow",
    money: {
      min: 2,
      max: 8,
    },
    chanceOfDying: 0.02,
    reply: `The cow poops out $money$ coins. Ok.`,
    deathReply: "The cow decides to sit on you.",
  },
  {
    name: "powerplant",
    money: {
      min: 15,
      max: 25,
    },
    chanceOfDying: 0.2,
    reply: `You find $money$ radioactive coins near the powerplant.`,
    deathReply:
      "The powerplant has a meltdown and it's Chernoybl all over again.",
  },
  {
    name: "school",
    money: {
      min: 4,
      max: 8,
    },
    chanceOfDying: 0.01,
    reply: `You find $money$ coins at your local elementary school.`,
    deathReply: "The doors slam shut on you while you were trying to enter.",
  },
];

export default {
  name: "search",
  aliases: ["scout"],
  args: false,
  usage: "",
  category: Category.ECONOMY,
  cooldown: 30,
  description: "Search for coins!",
  async execute(message, args, client) {
    const shuffled = shuffleArray(areas);
    const chosen = shuffled.slice(0, 3);
    const prompt = `Where do you want to search?\n${chosen
      .map((c) => `\`${c.name}\``)
      .join("\n")}`;

    const msg = await message.channel.send(prompt);

    const filter = (response: Message) =>
      chosen
        .map((c) => c.name)
        .includes(response.content.toLocaleLowerCase()) &&
      response.author.id === message.author.id;

    const choice = (
      await msg.channel.awaitMessages(filter, {
        maxProcessed: 1,
        time: 15000,
        errors: ["time"],
      })
    ).first();

    if (!choice) return "invalid";

    const user = await Users.findOne({
      where: {
        user_id: message.author.id,
      },
    });

    const areaChosen = chosen.find(
      (c) => c.name === choice.content.toLocaleLowerCase()
    );

    if (Math.random() < areaChosen.chanceOfDying) {
      user.kill();
      return choice.channel.send(areaChosen.deathReply);
    }

    const money = Math.round(
      Math.random() * (areaChosen.money.max - areaChosen.money.min) +
        areaChosen.money.min
    );

    user.income(money);

    return choice.channel.send(areaChosen.reply.replace("$money$", money));
  },
} as Command;

function shuffleArray(a: any[]) {
  const array = a;
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
