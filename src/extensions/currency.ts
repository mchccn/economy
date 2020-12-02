import { currency } from "..";
const { Users, CurrencyShop } = require("../dbObjects");

export default function init() {
  Reflect.defineProperty(currency, "add", {
    value: async function add(id: any, amount: any) {
      const user: any = currency.get(id);
      if (user) {
        user.balance += Number(amount);
        return user.save();
      }
      const newUser = await Users.create({ user_id: id, balance: amount });
      currency.set(id, newUser);
      return newUser;
    },
  });

  Reflect.defineProperty(currency, "getBalance", {
    value: function getBalance(id: any) {
      const user: any = currency.get(id);
      return user ? user.balance : 0;
    },
  });

  Reflect.defineProperty(currency, "getBank", {
    value: function getBank(id: any) {
      const user: any = currency.get(id);
      return user ? user.bank : 0;
    },
  });

  Reflect.defineProperty(currency, "getMaxBank", {
    value: function getMaxBank(id: any) {
      const user: any = currency.get(id);
      return user ? user.max_bank : 0;
    },
  });
}
