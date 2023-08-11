import SideIndicator from "./Side/SideIndicator/SideIndicator";
import "./Game.css";
import { GameSides } from "../../Consts";
import Side from "./Side/Side";
export default function Game() {
  let sideDivs = ["left", "right"];
  return (
    <div className='game_container'>
      {sideDivs.map((side) => {
        return (
          <Side
            side={side}
            selectedSide={true}></Side>
        );
      })}
    </div>
  );
}
