import React, { useEffect, useState } from "react";

import "./App.css";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Game from "./Pages/Game/Game";

function App() {
  const [username, setUsername] = useState<string>("");

  // useEffect(()=>{
  //   alert(username)},[username])
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage setUsername={setUsername}></HomePage>,
    },
    {
      path: "/Game",
      element: <Game username={username}></Game>,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
