import React from "react";
import "./App.css";
import MainTab from "./components/mainTab";

const App = () => {

  return (
    <div className="app-container">
      <div className="main-tab">
        <MainTab />
      </div>
      <div className="chat-container">

        Chat Container
      </div>
      <div className="conversation-panel">
        Conversation panel
      </div>
    </div>
  );
};

export default App;
