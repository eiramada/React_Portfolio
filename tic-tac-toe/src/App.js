import "./App.css";
import Gameboard from "./components/Gameboard";
import RegistrationForm from "./components/RegistrationForm";

function App() {
  return (
    <div className="app">
      <RegistrationForm />
        <Gameboard />
    </div>
  );
}

export default App;
