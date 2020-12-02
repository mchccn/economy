import Discord from "discord.js";
import { client, currency } from "..";
const { Users } = require("../dbObjects");
import { prefix } from "../config.json";

export default {
  event: "ready",
  type: "once",
  async run() {
    console.log("Ready!");
    const storedBalances = await Users.findAll();
    storedBalances.forEach((b: any) => currency.set(b.user_id, b));
    client.user?.setActivity({ type: "WATCHING", name: ` for ${prefix}help` });
  },
};
