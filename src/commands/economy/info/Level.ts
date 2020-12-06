import Command, { Category } from "../../../Command";
import { Users } from "../../../dbObjects";
import parseUsers from "../../../utils/parseUsers";

export default {
  name: "level",
  aliases: ["exp"],
  args: false,
  usage: "[user]",
  category: Category.ECONOMY,
  description: "See your level and exp or someone else's",
  cooldown: 1,
  async execute(message, args, client) {
    const user = parseUsers(args, message)[0] || message.author;

    const profile = await Users.findOne({
      where: {
        user_id: user.id,
      },
    });

    return message.channel.send(
      `level ${profile.level} | ${profile.exp} exp earned`
    );
  },
} as Command;
