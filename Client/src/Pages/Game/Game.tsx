import SideIndicator from "./Side/SideIndicator/SideIndicator";
import "./Game.css";
import { GameSides } from "../../Consts";
import Side from "./Side/Side";
import { useEffect, useState } from "react";
export default function Game() {
  const sideDivs = ["left", "right"];
  const generateSide = sideDivs[Math.round(Math.random() * 1)];
  const [selectedSide, setSelectedSide] = useState(
    sideDivs[Math.round(Math.random() * 1)]
  );
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const rand = Math.round(Math.random() * 1);
  //     setSelectedSide(sideDivs[rand]);
  //     console.log(selectedSide, rand);
  //   }, 1000);
  // }, []);
  return (
    <div className='game_container'>
      {sideDivs.map((side) => {
        return (
          <Side
            key={side}
            side={side}
            selectedSide={selectedSide === side}></Side>
        );
      })}
    </div>
  );
}
