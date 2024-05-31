import React from "react";
import "./App.css";
import MainTab from "./components/mainTab";
import ChartComponent from "./components/chartComponent";

const App = () => {

  return (
    <div className="app-container">
      <div className="main-tab">
        <MainTab />
      </div>
      <div className="chart-container">
        <ChartComponent />
      </div>
    </div>
  );
};

export default App;
