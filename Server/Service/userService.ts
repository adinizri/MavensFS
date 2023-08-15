import fs from "fs";
import path, { resolve } from "path";
import BasicUserModel from "../Models/BasicUser";
import axios from "axios";
import { rejects } from "assert";
import { promises } from "dns";

const usersDbPath = path.join(__dirname, "..", "DB", "users.json"); // Construct the full path



export const isUserExist = (username: string): Promise<number> => {
  return new Promise((resolve, reject) => {
   const users: BasicUserModel[]=JSON.parse(await fs.promises.readFile(usersDbPath, "utf8"))
    try{
          const userIndex = users.findIndex((user) => user.username === username);
           resolve(userIndex);
    }
    catch (error) {
        return reject(error);
      }
 
  });
};


export const getUsersFromDb=async()=>{
  
    try{
     const data = await fs.promises.readFile(usersDbPath, 'utf8');
    const users: any[] = JSON.parse(data);
    return (users)
    }
    catch(error){
         console.error('Error updating/creating user:', error);
        return (error)
    }


}

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
        
        axios
          .get(`https://api.genderize.io?name=${username}`) 
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
    
  });
};


export updateOrCreatUser=( userGameData: BasicUserModel):Promise<number>=>{
const userIndex=await isUserExist(userGameData.username);
const users=getUsersFromDb()
if(userIndex>-1&&users)
{
const user=users[userIndex]

}



}


