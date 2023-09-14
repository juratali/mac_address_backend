import { Router } from "express";

const maccAddress = Router();

maccAddress.get("/mac_address", async (req, res) => {
  try {
    res.json({
      maccAddress: "You missed out!!",
    });
  } catch (error) {
    console.log(error);
  }
});

export { maccAddress };
