import { Client, Message } from "discord.js";

export enum Category {
  UTIL = "util",
  ECONOMY = "economy",
  FUN = "fun",
  DEV = "dev",
}

type Command = {
  name: string;
  aliases: string[];
  description: string;
  category: Category;
  args: boolean;
  usage: string;
  cooldown: number;
  execute(message: Message, args: string[], client: Client): any;
};

export default Command;
