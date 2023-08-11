import { GameSides } from "../../../../Consts";
import "./SideIndicator.css";
interface IProps {
  side: string;
}
export default function SideIndicator({ side }: IProps) {
  const generateTop = Math.floor(Math.random() * 87);
  const generateleft = Math.floor(Math.random() * 90);
  return (
    <div
      className={`side_indicator ${side === "Right" ? "" : ""}`}
      style={{ top: `${generateTop}%`, left: `${generateleft}%` }}></div>
  );
}
