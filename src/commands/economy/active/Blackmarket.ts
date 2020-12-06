import { EmbedFieldData, MessageEmbed } from "discord.js";
import { shuffle } from "lodash";
import { Op } from "sequelize";
import Command, { Category } from "../../../Command";
import { BlackMarket, CurrencyShop, Users } from "../../../dbObjects";

export default {
  name: "blackmarket",
  aliases: ["offers", "offer", "marketplace"],
  args: false,
  usage: "[<price|'buy' <id>> <offer> [description]]",
  category: Category.ECONOMY,
  description: "Interact with the black market (WIP)",
  cooldown: 0,
  async execute(message, args, client) {
    if (args[0] === "cancel") {
      const user = await Users.findOne({
        where: {
          user_id: message.author.id,
        },
      });

      const offer = await BlackMarket.findOne({
        where: {
          user_id: message.author.id,
        },
      });

      if (!offer) {
        message.channel.send("You do not have any active offers!");
        return "invalid";
      }

      const offerOffer = offer.offer.split(" ").slice(0, 2);
      const offerAmount = offerOffer[0];
      const offerItem = offerOffer[1];

      const item = await CurrencyShop.findOne({
        where: { name: { [Op.like]: offer[1] } },
      });

      if (offerItem === "coin") {
        user.increment("balance", {
          by: offerAmount,
        });
      } else if (item) {
        const userItem = (await user.getItems()).find(
          (i: any) => i.dataValues.item.name === item.name
        );

        if (!userItem) {
          user.increment("balance", {
            by: 100,
          });
          user.save();
          return message.channel.send(
            "Sorry! There was an error in parsing your offer. You got 100 coins for compensation, though."
          );
        }

        userItem.increment("amount", {
          by: offerAmount,
        });
        userItem.save();
      } else {
        offer.destroy();
        user.increment("balance", {
          by: 100,
        });
        user.save();
        return message.channel.send(
          "Sorry! There was an error in parsing your offer. You got 100 coins for compensation, though."
        );
      }

      offer.destroy();
      return message.channel.send(
        `Canceled offer ${offer.user_id} and refunded your stuff!`
      );
    }

    if (args[0] === "buy") {
      const id = args[1];

      if (!/^\d{18}$/.test(args[1])) {
        message.channel.send("Enter a valid offer id.");
        return "invalid";
      }

      const user = await Users.findOne({
        where: {
          user_id: message.author.id,
        },
      });

      const dealer = await Users.findOne({
        where: {
          user_id: id,
        },
      });

      const offer = await BlackMarket.findOne({
        where: {
          user_id: id,
        },
      });

      if (!dealer) {
        message.channel.send(
          `Could not find the offer with an id of ${args[1]}`
        );
        return "invalid";
      }

      const dealerUser = client.users.cache.get(dealer.user_id);

      if (!dealerUser) {
        offer.destroy();
        message.channel.send(
          "Looks like the dealer wasn't found. Deleting offer..."
        );
        return "invalid";
      }

      const offerOffer = offer.offer.split(" ").slice(0, 2);
      const offerAmount = offerOffer[0];
      const offerItem = offerOffer[1];

      const pricePrice = offer.price.split(" ").slice(0, 2);
      const priceAmount = pricePrice[0];
      const priceItem = pricePrice[1];

      if (offerItem !== "coin" && priceItem !== "coin") {
        const paymentItem = await CurrencyShop.findOne({
          where: { name: { [Op.like]: priceItem } },
        });

        const userItem = (await user.getItems()).find(
          (i: any) => i.dataValues.item.name === paymentItem.name
        );

        const returnedItem = await CurrencyShop.findOne({
          where: { name: { [Op.like]: offerItem } },
        });

        const dealerItem = (await dealer.getItems()).find(
          (i: any) => i.dataValues.item.name === returnedItem.name
        );

        const userReturnedItem = (await dealer.getItems()).find(
          (i: any) => i.dataValues.item.name === returnedItem.name
        );

        const dealerReturnedItem = (await dealer.getItems()).find(
          (i: any) => i.dataValues.item.name === paymentItem.name
        );

        if (userItem) {
          if (userItem.dataValues.amount < priceAmount) {
            message.channel.send("You don't have that many items!");
            return "invalid";
          }
          userItem.decrement("amount", {
            by: parseInt(offerAmount),
          });
          userItem.save();
          dealerItem.decrement("amount", {
            by: parseInt(priceAmount),
          });
          dealerItem.save();
          dealerReturnedItem.increment("amount", {
            by: parseInt(priceAmount),
          });
          dealerReturnedItem.save();
          userReturnedItem.increment("amount", {
            by: parseInt(offerAmount),
          });
          userReturnedItem.save();
        } else {
          message.channel.send("You don't have that many items!");
          return "invalid";
        }
      } else if (offerItem === "coin" && priceItem !== "coin") {
        const returnedItem = await CurrencyShop.findOne({
          where: { name: { [Op.like]: offerItem } },
        });

        const dealerItem = (await dealer.getItems()).find(
          (i: any) => i.dataValues.item.name === returnedItem.name
        );

        const paymentItem = await CurrencyShop.findOne({
          where: { name: { [Op.like]: priceItem } },
        });

        const userItem = (await user.getItems()).find(
          (i: any) => i.dataValues.item.name === paymentItem.name
        );

        userItem.decrement("amount", {
          by: parseInt(offerAmount),
        });
        userItem.save();
        dealerItem.increment("amount", {
          by: parseInt(offerAmount),
        });
        dealerItem.save();
        user.increment("balance", {
          by: parseInt(priceAmount),
        });
        user.save();
        dealer.decrement("balance", {
          by: parseInt(priceAmount),
        });
        dealer.save();
      } else if (offerItem !== "coin" && priceItem === "coin") {
        const returnedItem = await CurrencyShop.findOne({
          where: { name: { [Op.like]: offerItem } },
        });

        const dealerItem = (await dealer.getItems()).find(
          (i: any) => i.dataValues.item.name === returnedItem.name
        );

        const paymentItem = await CurrencyShop.findOne({
          where: { name: { [Op.like]: priceItem } },
        });

        const userItem = (await user.getItems()).find(
          (i: any) => i.dataValues.item.name === paymentItem.name
        );

        userItem.increment("amount", {
          by: parseInt(offerAmount),
        });
        userItem.save();
        dealerItem.decrement("amount", {
          by: parseInt(offerAmount),
        });
        dealerItem.save();
        user.decrement("balance", {
          by: parseInt(priceAmount),
        });
        user.save();
        dealer.increment("balance", {
          by: parseInt(priceAmount),
        });
        dealer.save();
      } else {
        user.decrement("balance", {
          by: parseInt(offerAmount),
        });
        user.save();
        dealer.decrement("balance", {
          by: parseInt(priceAmount),
        });
        dealer.save();
      }

      try {
        offer.destroy();
        return dealerUser.send(
          `${message.author.username} has bought your offer! (The transaction might've failed, though)`
        );
      } catch (e) {
        message.channel.send("Transaction failed!");
        return "invalid";
      }
    }

    if (parseInt(args[0]) > 0) {
      if (
        await BlackMarket.findOne({
          where: {
            user_id: message.author.id,
          },
        })
      ) {
        message.channel.send("You already have an active offer!");
        return "invalid";
      }

      const user = await Users.findOne({
        where: {
          user_id: message.author.id,
        },
      });

      const price = args[0].split("-").slice(0, 2);
      if (price.length < 2 || !parseInt(price[0])) {
        message.channel.send(
          "Please enter prices like this: `amount-item_type`. For example: `420-coin`."
        );
        return "invalid";
      }

      const offer = args[1].split("-").slice(0, 2);
      if (offer.length < 2 || !parseInt(offer[0])) {
        message.channel.send(
          "Please enter prices like this: `amount-item_type`. For example: `420-coin`."
        );
        return "invalid";
      }

      const item = await CurrencyShop.findOne({
        where: { name: { [Op.like]: offer[1] } },
      });

      if (offer[1] === "coin") {
        if (user.balance < offer[0]) {
          message.channel.send("You don't have that many coins!");
          return "invalid";
        }
        user.decrement("balance", {
          by: parseInt(offer[0]),
        });
        user.save();
      } else if (item) {
        const offerItem = (await user.getItems()).find(
          (i: any) => i.dataValues.item.name === item.name
        );
        if (offerItem) {
          if (offerItem.dataValues.amount < offer[0]) {
            message.channel.send("You don't have that many items!");
            return "invalid";
          }
          offerItem.decrement("amount", {
            by: parseInt(offer[0]),
          });
          offerItem.save();
        } else {
          message.channel.send("You don't have that many items!");
          return "invalid";
        }
      } else {
        message.channel.send("Could not find that item!");
        return "invalid";
      }

      const description = args.slice(2).join(" ") || null;
      await BlackMarket.create({
        user_id: message.author.id,
        price: price.join(" "),
        offer: offer.join(" "),
        description: description,
      });
      return message.channel.send("Created a new offer!");
    }

    if (!args.length) {
      const offers = shuffle(await BlackMarket.findAll()).slice(0, 5);
      return message.channel.send(
        new MessageEmbed()
          .setTitle("Blackmarket Offers")
          .setDescription(
            "The blackmarket is ran by the users. Don't tell nobody."
          )
          .addFields(
            offers.map(
              (c): EmbedFieldData => {
                const price = c.dataValues.price.split(" ").slice(0, 2);
                const formatPrice = `${price[0]} ${price[1]}${
                  parseInt(price[0]) !== 1 && !price[1].endsWith("es")
                    ? "s"
                    : ""
                }`;
                const offer = c.dataValues.offer.split(" ").slice(0, 2);
                const formatOffer = `${offer[0]} ${offer[1]}${
                  parseInt(offer[0]) !== 1 && !offer[1].endsWith("es")
                    ? "s"
                    : ""
                }`;
                return {
                  name: `Offer id: ${c.dataValues.user_id}`,
                  value: `Price: ${formatPrice}\nOffer: ${formatOffer}\n*${
                    c.dataValues.description || "No description"
                  }*`,
                };
              }
            )
          )
          .setColor("RANDOM")
          .setFooter("shhhhhhhhhh!")
      );
    }
  },
} as Command;
