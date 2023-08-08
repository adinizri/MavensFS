import SideIndicator from "./SideIndicator/SideIndicator";
import "./Game.css";
import { GameSides } from "../../Consts";
export default function Game() {
  let sideDivs = ["left", "right"];
  return (
    <div className='game_container'>
      {sideDivs.map((side) => {
        return (
          <div className={`side ${side === "right" ? "spliter" : ""}`}></div>
        );
      })}
      <SideIndicator side={0}></SideIndicator>
    </div>
  );
}
