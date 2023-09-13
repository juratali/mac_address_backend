import express from "express";
import cors from "cors";
import { maccAddress } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(maccAddress);

app.listen(9090, () => {
  console.log(`Server running on http://localhost:9090`);
});
