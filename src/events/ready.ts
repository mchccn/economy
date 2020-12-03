import { client } from "..";
import { prefix } from "../config.json";

export default {
  event: "ready",
  type: "once",
  async run() {
    console.log("Ready!");
    client.user?.setActivity({ type: "WATCHING", name: ` for ${prefix}help` });
    client.guilds.cache.forEach((guild) => {
      guild.members.fetch();
    });
  },
};
