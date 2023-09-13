import { Router } from "express";
import getMac from "getmac";
import { Bot } from "grammy";

const maccAddress = Router();
const bot = new Bot("6353419097:AAHf-8ekh6WRvsMVXEIR888nhgL64SDV1CE");

maccAddress.get("/mac_address", async (req, res) => {
  try {
    let maccAddress = getMac();

    let text = `mac_address: ${maccAddress}`;

    // await bot.api.sendMessage("1481019537", text);

    res.json({
      maccAddress,
    });
  } catch (error) {
    console.log(error);
  }
});

export { maccAddress };
