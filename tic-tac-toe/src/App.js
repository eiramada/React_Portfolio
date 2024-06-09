import { Route, Routes } from "react-router-dom";
import "./App.css";
import Gameboard from "./components/Gameboard";
import RegistrationForm from "./components/RegistrationForm";
import Scoreboard from "./components/Scoreboard";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="" element={<RegistrationForm />} />
        <Route path="/game" element={<Gameboard />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
      </Routes>
    </div>
  );
}

export default App;
