import { GameSides } from "../../../../Consts";
import "./SideIndicator.css";
interface IProps {
  side: string;
}
export default function SideIndicator({ side }: IProps) {
  return <div className={`side_indicator ${side === "Right" ? "" : ""}`}></div>;
}
