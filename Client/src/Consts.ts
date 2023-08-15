import { IUserReaction } from "./Interfaces/UserReaction.type";

export const serverAdress="http://localhost:5000";

export enum GameSides {
    Left=0,
    Right=1
}
export enum userReactionIds {
    tooSoon=0,
    wrongKey=1,
    tooLate=2,
    success=3
}

export const sideDivs = ["left", "right"];

export const userReactionOptions :IUserReaction= {
   0:{type:"Mistake",message:"Too Soon"},
   1:{type:"Mistake",message:"Wrong Key"},
   2:{type:"Mistake",message:"Too Late"},
   3:{type:"Success",message:"Success"},
    
}