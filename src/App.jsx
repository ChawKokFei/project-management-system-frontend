import { useState } from "react";
import "./App.css";
import Loading from "./components/Loading/Loading";
import HomeNavigation from "./components/Routes/HomeNavigation";

function App() {
  const hello = false;

  return hello ? <Loading /> : <HomeNavigation />;
}

export default App;
