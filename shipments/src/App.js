import { Navigate, Route, Routes } from "react-router-dom";
import ShipmentDetails from "./pages/ShipmentDetails";
import Shipments from "./pages/Shipments";

// @mui material components
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

// Material Kit 2 React themes
import theme from "./assets/theme";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Routes>
          <Route path="" element={<Navigate to="/shipments" />}></Route>
          <Route path="shipments" element={<Shipments />} />
          <Route path="shipment/:index" element={<ShipmentDetails />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
