import "Side.css";
import SideIndicator from "./SideIndicator/SideIndicator";
interface IProps {
  side: string;
  selectedSide: boolean;
}

export default function Side({ side, selectedSide }: IProps) {
  return (
    <div className={`side ${side === "right" ? "spliter" : ""}`}>
      {selectedSide && <SideIndicator side={side}></SideIndicator>}
    </div>
  );
}
