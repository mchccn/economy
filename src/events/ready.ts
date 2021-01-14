import { client } from "..";

export default {
    event: "ready",
    type: "once",
    async run() {
        console.log("Ready!");
        client.user?.setActivity({ type: "WATCHING", name: ` for ${process.env.PREFIX}help` });
        client.guilds.cache.forEach((guild) => {
            guild.members.fetch();
        });
    },
};
