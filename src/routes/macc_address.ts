import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import getMac from "getmac";

const maccAddress = Router();

maccAddress.get("/mac_address", async (req, res) => {
  try {
    let maccAddress = getMac();

    res.json({
      maccAddress,
    });
  } catch (error) {
    console.log(error);
  }
});

export { maccAddress };
