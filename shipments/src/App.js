import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Shipments from "./pages/Shipments";

function App() {
  return (
    <div>
      TERE
      <Link to="shipments">
        <button>Shipments</button>
      </Link>
      <Routes>
        <Route path="shipments" element={<Shipments />} />
      </Routes>
    </div>
  );
}

export default App;
