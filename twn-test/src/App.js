import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Article from "./pages/Article";
import Home from "./pages/Home";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
    console.log("toggle", isSidebarOpen);
  }

  console.log("issidebaropen", isSidebarOpen);
  return (
    <div className="app">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="article" element={<Article />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
