import { IReactionType } from "../../Interfaces/ReactionType.type";
import "./Game.css";
import {
  GameSides,
  serverAdress,
  sideDivs,
  userReactionIds,
  userReactionOptions,
} from "../../Consts";
import Side from "./Side/Side";
import { useCallback, useEffect, useRef, useState } from "react";
import FeedbackMessage from "./FeedbackMessage/FeedbackMessage";
import axios from "axios";

interface IProps {
  username: string;
}
export default function Game({ username }: IProps) {
  const [selectedSide, setSelectedSide] = useState<string>(); //the selected side
  const [showIndicator, setShowIndicator] = useState<boolean>(false);
  const [gamesPlayedCounter, setGamePlayedCounter] = useState(0);
  const [gamesWonCounter, setGamesWonCounter] = useState(0);
  const showIndicatorRef = useRef(showIndicator); //to get access to the showIndicator state in the event listener
  const selectedSideRef = useRef(selectedSide); //to get access to the selectedSide state in the event listener
  const gamesWonRef = useRef(gamesWonCounter); //using ref to access the data in the post request
  const gamesPlayedRef = useRef(gamesPlayedCounter); //using ref to access the data in the post request
  const userReactionRef = useRef<IReactionType>(); //saving the user reaction in a ref for update it without a render
  showIndicatorRef.current = showIndicator; //setting it after render
  selectedSideRef.current = selectedSide; //setting it after render
  gamesWonRef.current = gamesWonCounter;
  gamesPlayedRef.current = gamesPlayedCounter;
  const randomSide = Math.round(Math.random() * 1); //random 0 or 1 that indicate the side index
  const randomWaitingTime = Math.floor(Math.random() * (5000 - 2000) + 2000); // Random time between 2 to 5 seconds in milliseconds
  const isKeyPressedRef = useRef(false); //check if the user press a key

  // the initail useEffect to set the event listener once and remove it when dont need
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress); //create event listener on component mounting
    return () => {
      //remove event listener on component unmount
      window.removeEventListener("keydown", handleKeyPress);
      sendUserData();
    };
  }, []);

  //reset the game
  useEffect(() => {
    if (username) {
      isKeyPressedRef.current = false;
      setShowIndicator(false);
      setSelectedSide(sideDivs[randomSide]);
      const waitingModeTimer = setTimeout(() => {
        setShowIndicator(true);

        const showIndicatorTimer = setTimeout(() => {
          setGamePlayedCounter((prevCounter) => prevCounter + 1);
          setShowIndicator(false);

          userReactionRef.current ==
            userReactionOptions[userReactionIds.success] &&
            setGamesWonCounter((counter) => counter + 1);

          if (!isKeyPressedRef.current) {
            userReactionRef.current =
              userReactionOptions[userReactionIds.tooLate];
          }
        }, 1000);

        return () => clearTimeout(showIndicatorTimer);
      }, randomWaitingTime);

      return () => {
        clearTimeout(waitingModeTimer);
      };
    }
  }, [gamesPlayedCounter]);

  const sendUserData = () => {
    if (userReactionRef.current) {
      axios
        .put(`${serverAdress}/user`, {
          username: username,
          gamesPlayed: gamesPlayedRef.current,
          gamesWon: gamesWonRef.current,
        })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    }
  };

  //key press handler
  const handleKeyPress = (event: KeyboardEvent) => {
    isKeyPressedRef.current = true;
    // im using ref because I want to pass the event listener the current value
    if (showIndicatorRef.current) {
      const isCorrectKey =
        (event.key === "a" || event.key === "l") && event.key === "a"
          ? selectedSideRef.current === sideDivs[GameSides.Left]
          : selectedSideRef.current === sideDivs[GameSides.Right];

      if (isCorrectKey) {
        userReactionRef.current = userReactionOptions[userReactionIds.success];
      } else {
        userReactionRef.current = userReactionOptions[userReactionIds.wrongKey];
      }
    } else {
      userReactionRef.current = userReactionOptions[userReactionIds.tooSoon];
    }
  };

  return username ? (
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
  ) : null;
}
