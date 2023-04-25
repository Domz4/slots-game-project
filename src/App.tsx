import React from "react";
import "./App.css";
import { HomePage } from "./pages/Homepage";
import { SlotsGame } from "./components/game/components/Game";
function App() {
  return (
    <div className="App">
      <SlotsGame title={"title"} />
      <HomePage />
    </div>
  );
}
export default App;
