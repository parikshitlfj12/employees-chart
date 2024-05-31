import "./App.css";
import MainTab from "./components/shared/sideBar";
import EmployeesComponent from "./components/EmployeesComponent";
import Navbar from "./components/shared/navbar";

const App = () => {

  return (
    <>
      <Navbar />
      <div className="app-container">
        <div className="main-tab">
          <MainTab />
        </div>
        <div className="chart-container">
          <EmployeesComponent />
        </div>
      </div>
    </>
  );
};

export default App;
