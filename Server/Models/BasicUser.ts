interface BasicUser {
  username: string;
  gamesPlayed: number;
  gamesWon: number;


}

class BasicUserModel implements BasicUser {
   username: string;
  gamesPlayed: number;
  gamesWon: number;


  constructor( username: string, gamesPlayed: number, gamesWon: number) {
 
    this.username = username;
    this.gamesPlayed = gamesPlayed;
    this.gamesWon = gamesWon;
  }
}
export default BasicUserModel