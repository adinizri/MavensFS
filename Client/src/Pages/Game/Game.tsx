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
import FeedbackMessage from "./FeedbackMessage/FeedbackMessage";

export default function Game() {
  const [selectedSide, setSelectedSide] = useState<string>(); //the selected side
  const [showIndicator, setShowIndicator] = useState<boolean>(false);
  const [gamesPlayedCounter, setGamePlayedCounter] = useState(0);

  const isKeyPressedRef = useRef(false);
  const showIndicatorRef = useRef(showIndicator); //to get access to the showIndicator state in the event listener
  const selectedSideRef = useRef(selectedSide); //to get access to the selectedSide state in the event listener
  const userReactionRef = useRef<IReactionType>(); //saving the user reaction in a ref for update it without a render

  showIndicatorRef.current = showIndicator; //setting it after render
  selectedSideRef.current = selectedSide; //setting it after render

  const randomSide = Math.round(Math.random() * 1); //random 0 or 1 that indicate the side index
  const randomWaitingTime = Math.floor(Math.random() * (5000 - 2000) + 2000); // Random time between 2 to 5 seconds in milliseconds

  useEffect(() => {
    isKeyPressedRef.current = false;
    setShowIndicator(false);
    setSelectedSide(sideDivs[randomSide]);
    const waitingTimer = setTimeout(() => {
      setShowIndicator(true);

      const showTimer = setTimeout(
        () => {
          setGamePlayedCounter((prevCounter) => prevCounter + 1);
          console.log(gamesPlayedCounter);
          setShowIndicator(false);
          if (!isKeyPressedRef.current) {
            userReactionRef.current =
              userReactionOptions[userReactionIds.tooLate];
          }
        },

        1000
      );
      return () => clearTimeout(showTimer);
    }, randomWaitingTime);

    //handling key press
    return () => {
      clearTimeout(waitingTimer);
    };
  }, [gamesPlayedCounter]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress); //create event listener on component mounting
    return () => window.removeEventListener("keydown", handleKeyPress); //remove event listener on component unmount
  }, []);

  //key press handler
  const handleKeyPress = (event: KeyboardEvent) => {
    isKeyPressedRef.current = true;
    // im using ref because I want to pass the event listener the current value
    if (showIndicatorRef.current) {
      const isCorrectKey =
        (event.key === "a" || event.key === "l") && event.key === "a"
          ? selectedSideRef.current === sideDivs[GameSides.Left]
          : selectedSideRef.current === sideDivs[GameSides.Right];

      isCorrectKey
        ? (userReactionRef.current =
            userReactionOptions[userReactionIds.success])
        : (userReactionRef.current =
            userReactionOptions[userReactionIds.wrongKey]);
    } else {
      userReactionRef.current = userReactionOptions[userReactionIds.tooSoon];
    }
  };

  return (
    <>
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
      {userReactionRef.current && !showIndicator && (
        <FeedbackMessage
          userReaction={userReactionRef.current}
          gameCounter={gamesPlayedCounter}></FeedbackMessage>
      )}
    </>
  );
}
