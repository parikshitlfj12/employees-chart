import "./App.css";
import MainTab from "./components/sideBar";
import ChartComponent from "./components/chartComponent";
import Navbar from "./components/navbar";

const App = () => {

  return (
    <>
      <Navbar />
      <div className="app-container">
        <div className="main-tab">
          <MainTab />
        </div>
        <div className="chart-container">
          <ChartComponent />
        </div>
      </div>
    </>
  );
};

export default App;
