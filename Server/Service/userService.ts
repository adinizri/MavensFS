import fs from "fs";
import path, { resolve } from "path";
import BasicUserModel from "../Models/BasicUser";
import axios from "axios";
import { rejects } from "assert";
import { promises } from "dns";

const USERS_DB_PATH = path.join(__dirname, "..", "DB", "users.json"); // Construct the full path

export const isUserExist = (username: string): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    const users: BasicUserModel[] = JSON.parse(
      await fs.promises.readFile(USERS_DB_PATH, "utf8")
    );
    try {
      const userIndex = users.findIndex((user) => user.username === username);
      resolve(userIndex);
    } catch (error) {
      return reject(error);
    }
  });
};

export const getUsersFromDb = async () => {
  const data = await fs.promises.readFile(USERS_DB_PATH, "utf8");
  try {
    const users: any[] = JSON.parse(data);
    return users;
  } catch (error) {
    console.error("Error updating/creating user:", error);
    return error;
  }
};

//get the user Fake Data
export const getUserFakeData = async (
  userGameData: BasicUserModel
): Promise<any> => {
  let username = userGameData.username;
  let gender: string | undefined = undefined; //the user gender
  let userData: any = {}; // the userData
  return new Promise(async (resolve, reject) => {
    // let userDbData = await isUserExist(username); //gets the user data from the users.json file if exist in it
    // if (userDbData) {
    //   userData = { ...userDbData } as BasicUserModel;
    //   userData.gamesWon = userData.gamesWon + userGameData.gamesWon;
    //   userData.gamesPlayed = userData.gamesPlayed + userGameData.gamesPlayed;
    //   resolve(userData);
    // } else

    try {
      const genderResult = await axios.get(
        `https://api.genderize.io?name=${username}`
      );
      const probability = genderResult.data.probability;
      if (probability > 0.95) gender = genderResult.data.gender;

      if (gender) {
        const fakeData = await axios.get(
          `https://randomuser.me/api/?gender=${gender}`
        );
        if (fakeData.data.results[0]) {
          userData = { ...userGameData, ...fakeData.data.results[0] };
          resolve(userData);
        }
      } else {
        userData = { ...userGameData, ...{ gender: gender } };
        resolve(userData);
      }
    } catch (error) {
      reject(`An error occurred ${error}`);
    }
  });
};

export const updateOrCreatUser = (userGameData: BasicUserModel) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userIndex = await isUserExist(userGameData.username);
      const users = (await getUsersFromDb()) as BasicUserModel[];
      //if user exist in the DB
      if (userIndex > -1 && users) {
        const user = users[userIndex];
        if (user) {
          user.gamesPlayed += userGameData.gamesPlayed;
          user.gamesWon += userGameData.gamesWon;
        }
      } else {
        const user = await getUserFakeData(userGameData);
        users.push(user);
      }
      resolve(insertOrUpdateDb(JSON.stringify(users)));
    } catch (error) {
      reject(error);
    }
  });
};

const insertOrUpdateDb = async (data: string) => {
  try {
    const result = await fs.promises.writeFile(USERS_DB_PATH, data, "utf8");
    return resolve();
  } catch (error) {
    return error;
  }
};
