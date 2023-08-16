import "./Side.css";
import SideIndicator from "./SideIndicator/SideIndicator";
interface IProps {
  side: string;
  selectedSide: boolean;
  showIndicator: boolean;
}

export default function Side({ side, selectedSide, showIndicator }: IProps) {
  return (
    <div className={`side ${side === "right" && "spliter"}`}>
      {showIndicator && selectedSide && <SideIndicator></SideIndicator>}
    </div>
  );
}
