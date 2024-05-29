import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ShipmentDetails from "./pages/ShipmentDetails";
import Shipments from "./pages/Shipments";

function App() {
  return (
    <div>
      <Routes>
        <Route path="" element={<Navigate to="/shipments" />}></Route>
        <Route path="shipments" element={<Shipments />} />
        <Route path="shipment/:orderNo" element={<ShipmentDetails />} />
      </Routes>
    </div>
  );
}

export default App;
