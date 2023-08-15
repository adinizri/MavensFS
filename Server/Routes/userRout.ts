import express, { response } from "express";
import axios from "axios";
import { getFullUserData } from "../Service/userService";
import BasicUserModel from "../Models/BasicUser";
const router = express.Router();

router.get("/", function (req, res) {
  res.send("user home page");
});

router.put("/", async function (req, res) {
  let userGameData: BasicUserModel = req.body; //gets the user GameData from the game
  try {
    const userData = await getFullUserData(userGameData);
    res.send(userData);
  } catch {}
});

export default router;
