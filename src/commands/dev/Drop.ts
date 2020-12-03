import { exec } from "child_process";
import Command, { Category } from "../../Command";
import { sequelize } from "../../dbObjects";

export default {
  name: "drop",
  aliases: [""],
  args: false,
  usage: "",
  category: Category.DEV,
  description:
    "Drop all the tables in the database and initiate the database again.",
  cooldown: 0,
  async execute(message, args, client) {
    sequelize.drop();
    exec(`ts-node ${__dirname}/../../dbInit.ts`, (error, stdout, stderr) => {
      if (error)
        return message.channel.send(
          `Wipe failed:\n\`\`\`${error.message}\`\`\``
        );
      if (stderr)
        return message.channel.send(`Wipe failed:\n\`\`\`${stderr}\`\`\``);
      return message.channel.send("Database wiped.");
    });
  },
} as Command;
