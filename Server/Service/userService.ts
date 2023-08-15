import fs from "fs";
import path, { resolve } from "path";
import BasicUserModel from "../Models/BasicUser";
import axios from "axios";
import { rejects } from "assert";

const usersDb = path.join(__dirname, "..", "DB", "users.json"); // Construct the full path

export const getUserfromDb = (username: string): Promise<any | null> => {
  return new Promise((resolve, reject) => {
    fs.readFile(usersDb, "utf8", (error, data) => {
      if (error) {
        return reject(error);
      }
      try {
        const users: BasicUserModel[] = JSON.parse(data);
        // let userIndex: number = -1;
        const userIndex = users.findIndex((user) => user.username === username);
        resolve(users[userIndex] || null);
      } catch (error) {
        return reject(error);
      }
    });
    return undefined;
  });
};

export const getFullUserData = async (
  userGameData: BasicUserModel
): Promise<any> => {
  let username = userGameData.username;
  let gender: string | undefined = undefined; //the user gender
  let userData: any = {}; // the userData
  return new Promise(async (resolve, reject) => {
    let userDbData = await getUserfromDb(username); //gets the user data from the users.json file if exist in it
    if (userDbData) {
      userData = { ...userDbData } as BasicUserModel;
      userData.gamesWon = userData.gamesWon + userGameData.gamesWon;
      userData.gamesPlayed = userData.gamesPlayed + userGameData.gamesPlayed;
      resolve(userData);
    } else {
      try {
        axios
          .get(`https://api.genderize.io?name=${userGameData.username}`)
          .then(async (response) => {
            const probability = response.data.probability;
            if (probability > 0.95) gender = response.data.gender;

            if (gender) {
              let fakeData = await axios.get(
                `https://randomuser.me/api/?gender=${gender}`
              );
              if (fakeData.data.results[0]) {
                userData = { ...userData, ...fakeData.data.results[0] };
                resolve(userData);
              }
            } else resolve(userData);
          });
      } catch (error) {
        reject(`An error occurred ${error}`);
      }
    }
  });
};


export updateOrCreatUser=( userGameData: BasicUserModel):Promise<number>=>{
const userData=await getFullUserData(userGameData);


}
