import express, { response } from "express";
import axios from "axios";
import { getLeaderboard, updateOrCreatUser } from "../Service/userService";
import BasicUserModel from "../Models/BasicUser";
import { log } from "console";
const router = express.Router();

router.get("/", function (req, res) {
  res.send("user home page");
});

router.put("/", async function (req, res) {
  let userGameData: BasicUserModel = req.body; //gets the user GameData from the game
  try {
    const result: any = await updateOrCreatUser(userGameData);
    console.log(result);
    res.status(result.statusCode).send(result.message);
    // res.status(result.statusCode).send(result.message);
  } catch (error: any) {
    res.status(error.statusCode).send(error);
  }
});

router.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await getLeaderboard();
    res.send(leaderboard);
  } catch (error) {
    res.send(error);
  }
});

export default router;
