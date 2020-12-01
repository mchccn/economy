import Discord, { Collection } from "discord.js";
import { Sequelize } from "sequelize";

export enum Category {
  UTIL = "util",
  ECONOMY = "economy",
  FUN = "fun",
}

type Command = {
  name: string;
  aliases: string[];
  description: string;
  category: Category;
  args: boolean;
  usage: string;
  execute(
    message: Discord.Message,
    args: string[],
    client: Discord.Client,
    currency: Collection<any, any>,
    users: any,
    shop: any
  ): any;
};

export default Command;
