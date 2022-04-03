import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Events from "./Components/Events/Events.js";
import Events00 from "./Components/Backend/Events00/Events00.js";
import MyRoutes from "./myRoutes";
import { useEffect, useState } from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
