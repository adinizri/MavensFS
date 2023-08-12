import SideIndicator from "./Side/SideIndicator/SideIndicator";
import "./Game.css";
import { GameSides, sideDivs } from "../../Consts";
import Side from "./Side/Side";
import { useEffect, useState } from "react";
import { log } from "console";
export default function Game() {
  const [selectedSide, setSelectedSide] = useState<string>(); //the selected side
  const [userReaction, setUserReaction] = useState(); //the user reaction
  const [showIndicator, setShowIndicator] = useState<boolean>(false);
  const getRandomTime = () => {
    return Math.floor(Math.random() * (5000 - 2000) + 2000); // Random time between 2 to 5 seconds in milliseconds
  };

  useEffect(() => {
    const randomSide = Math.round(Math.random() * 1); //random 0 or 1 that indicate the side index
    const randomWaitingSide = Math.floor(Math.random() * (5000 - 2000) + 2000); // Random time between 2 to 5 seconds in milliseconds

    const timeout = setTimeout(() => {
      setShowIndicator(true);
      console.log("indicate show after ", randomWaitingSide);
    }, randomWaitingSide);

    setSelectedSide(sideDivs[randomSide]);

    //handling key press
    window.addEventListener("keydown", handleKeyDown); //create event listener on component mounting
    return () => {
      window.removeEventListener("keydown", handleKeyDown); //remove event listener on component unmount
      clearTimeout(timeout); //clear the timeout
    };
  }, []);

  //key press handler
  const handleKeyDown = (event: KeyboardEvent) => {
    if (showIndicator) {
      if (event.key === "a") {
      }
      if (event.key === "l") {
      }
    } else {
      // setUserReaction()
    }
  };

  return (
    <div className='game_container'>
      {sideDivs.map((side) => {
        return (
          <Side
            showIndicator={showIndicator}
            key={side}
            side={side}
            selectedSide={selectedSide === side}></Side>
        );
      })}
    </div>
  );
}
