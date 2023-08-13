import "./FeedbackMessage.css";
import { IReactionType } from "../../../Interfaces/ReactionType.type";

interface IProps {
  userReaction: IReactionType;
  gameCounter: number;
}

export default function FeedbackMessage({ userReaction, gameCounter }: IProps) {
  return (
    <h1
      className='Message'
      style={{ color: userReaction.type === "Mistake" ? "red" : "green" }}>
      {`Game number ${gameCounter} result: ${userReaction.message}`}
    </h1>
  );
}
