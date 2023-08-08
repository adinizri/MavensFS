import React, { useState } from "react";
import "./HomePage.css";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface HomePageProps {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}
export default function HomePage(props: HomePageProps) {
  const [usernameValue, setUsernameValue] = useState<string>("");
  const navigate = useNavigate();
  const handleUsernameInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsernameValue(e.target.value);
  };
  const onClickStart = () => {
    props.setUsername(usernameValue);
    if (usernameValue) {
      navigate("/Game");
    }
  };
  return (
    <div className='HomePage_container'>
      <div className='HomePage'>
        <h1 className='HomePage_title'>How Fast are you?</h1>
        <div className='login_container'>
          <input
            value={usernameValue}
            placeholder='Enter username'
            onChange={handleUsernameInputChange}></input>
          <button onClick={onClickStart}>Start</button>
        </div>
      </div>
    </div>
  );
}
