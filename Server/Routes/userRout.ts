import express, { response } from "express";
import axios from "axios";
import { updateOrCreatUser } from "../Service/userService";
import BasicUserModel from "../Models/BasicUser";
import { log } from "console";
const router = express.Router();

router.get("/", function (req, res) {
  res.send("user home page");
});

router.put("/", async function (req, res) {
  let userGameData: BasicUserModel = req.body; //gets the user GameData from the game
  try {
    const userData = await updateOrCreatUser(userGameData);
    res.send(userData);
  } catch (error) {
    log(error);
    res.send(error);
  }
});

export default router;
