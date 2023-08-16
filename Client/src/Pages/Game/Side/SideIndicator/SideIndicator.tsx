import "./SideIndicator.css";

export default function SideIndicator() {
  const generateTop = Math.floor(Math.random() * 87);
  const generateleft = Math.floor(Math.random() * 90);
  return (
    <div
      className={"side_indicator "}
      style={{ top: `${generateTop}%`, left: `${generateleft}%` }}></div>
  );
}
