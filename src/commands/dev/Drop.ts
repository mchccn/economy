import { exec } from "child_process";
import Command, { Category } from "../../Command";
import { sequelize } from "../../dbObjects";

export default {
  name: "drop",
  aliases: ["wipe"],
  args: false,
  usage: "",
  category: Category.DEV,
  cooldown: 0,
  description:
    "Drop all the tables in the database and initiate the database again.",
  async execute(message, args, client) {
    const wipe = await message.channel.send("Wiping...");
    sequelize.drop();
    exec(`ts-node ${__dirname}/../../dbInit.ts`, (error, stdout, stderr) => {
      if (error) return wipe.edit(`Wipe failed:\n\`\`\`${error.message}\`\`\``);
      if (stderr) return wipe.edit(`Wipe failed:\n\`\`\`${stderr}\`\`\``);
      return wipe.edit("Database wiped.");
    });
  },
} as Command;
