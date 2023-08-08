import { GameSides } from "../../../Consts";
import "./SideIndicator.css";
interface SideIndicatorProps {
  side: number;
}
export default function SideIndicator(props: SideIndicatorProps) {
  return (
    <div
      className={`side_indicator ${
        props.side === GameSides.Right ? "" : ""
      }`}></div>
  );
}
