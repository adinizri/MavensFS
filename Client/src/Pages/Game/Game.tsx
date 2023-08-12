import SideIndicator from "./Side/SideIndicator/SideIndicator";
import { IReactionType } from "../../Interfaces/ReactionType.type";
import "./Game.css";
import {
  GameSides,
  sideDivs,
  userReactionIds,
  userReactionOptions,
} from "../../Consts";
import Side from "./Side/Side";
import { useEffect, useRef, useState } from "react";

export default function Game() {
  const [selectedSide, setSelectedSide] = useState<string>(); //the selected side
  const [userReaction, setUserReaction] = useState<IReactionType>(); //the user reaction
  const [showIndicator, setShowIndicator] = useState<boolean>(false);
  const [isKeyPressed, setIsKeyPressed] = useState<boolean>(false);
  const showIndicatorRef = useRef(showIndicator);
  showIndicatorRef.current = showIndicator;
  const selectedSideRef = useRef(selectedSide);
  selectedSideRef.current = selectedSide;
  const isInTimeRef = useRef(false);

  useEffect(() => {
    startGame();
    //handling key press
    window.addEventListener("keydown", handleKeyDown); //create event listener on component mounting
    return () => {
      window.removeEventListener("keydown", handleKeyDown); //remove event listener on component unmount
    };
  }, []);

  const startGame = () => {
    userReaction && alert(userReaction.message);
    setShowIndicator(false);
    isInTimeRef.current = false;
    const randomSide = Math.round(Math.random() * 1); //random 0 or 1 that indicate the side index
    setSelectedSide(sideDivs[randomSide]);

    const randomWaitingTime = Math.floor(Math.random() * (5000 - 2000) + 2000); // Random time between 2 to 5 seconds in milliseconds

    setTimeout(() => {
      setShowIndicator(true);
      isInTimeRef.current = true;
      setTimeout(() => (isInTimeRef.current = false), 1000);
    }, randomWaitingTime);
  };

  //key press handler
  const handleKeyDown = (event: KeyboardEvent) => {
    // im using ref because I want to pass the event listener the current value
    if (showIndicatorRef.current) {
      const isCorrectKey =
        (event.key === "a" || event.key === "l") && event.key === "a"
          ? selectedSideRef.current === sideDivs[GameSides.Left]
          : selectedSideRef.current === sideDivs[GameSides.Right];

      if (isCorrectKey) {
        if (isInTimeRef.current) {
          setUserReaction(userReactionOptions[userReactionIds.success]);
        } else {
          setUserReaction(userReactionOptions[userReactionIds.tooLate]);
        }
      } else {
        setUserReaction(userReactionOptions[userReactionIds.wrongKey]);
      }
    } else {
      setUserReaction(userReactionOptions[userReactionIds.tooSoon]);
    }

    startGame();
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
