import fs from "fs";
import path, { resolve } from "path";
import BasicUserModel from "../Models/BasicUser";
import axios from "axios";
import { rejects } from "assert";
import { promises } from "dns";

const USERS_DB_PATH = path.join(__dirname, "..", "DB", "users.json"); // Construct the full path

//return the user index in the jsons array if exist
export const isUserExist = (username: string): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    let dbData = await fs.promises.readFile(USERS_DB_PATH, "utf8");
    const users: BasicUserModel[] = dbData ? JSON.parse(dbData) : [];
    try {
      const userIndex = users.findIndex((user) => user.username === username);
      resolve(userIndex);
    } catch (error) {
      return reject(error);
    }
  });
};

//get the users array from the json file
export const getUsersFromDb = async () => {
  try {
    const data = await fs.promises.readFile(USERS_DB_PATH, "utf8");
    const users: any[] = data ? JSON.parse(data) : [];
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

export const updateOrCreatUser = (
  userGameData: BasicUserModel
): Promise<{ message: string; statusCode: number }> => {
  return new Promise<{ message: string; statusCode: number }>(
    async (resolve, reject) => {
      try {
        let statusCode = 200;
        let massege = "user added";
        const userIndex = await isUserExist(userGameData.username);
        let users = (await getUsersFromDb()) as BasicUserModel[];
        //if user exist in the DB
        if (userIndex > -1 && users) {
          const user = users[userIndex];
          if (user) {
            user.gamesPlayed += userGameData.gamesPlayed;
            user.gamesWon += userGameData.gamesWon;
            statusCode = 201;
            massege = "user updated";
          }
        } else {
          const user = await getUserFakeData(userGameData);
          users.push(user);
        }
        // await insertOrUpdateDb(JSON.stringify(users));
        await fs.promises.writeFile(USERS_DB_PATH, JSON.stringify(users));
        resolve({ message: massege, statusCode: statusCode });
      } catch (error) {
        console.log(error);
        reject({ message: error, statusCode: 500 });
      }
    }
  );
};

const insertOrUpdateDb = async (data: string): Promise<boolean> => {
  try {
    await fs.promises.writeFile(USERS_DB_PATH, data, "utf8");
    return true;
  } catch (error) {
    return false;
  }
};
