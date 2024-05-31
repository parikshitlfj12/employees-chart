import "./App.css";
import MainTab from "./components/shared/sideBar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import EmployeesComponent from "./components/EmployeesComponent";
import SingleEmployeeComponent from "./components/SingleEmployeeComponent";
import Navbar from "./components/shared/navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <div className="main-tab">
          <MainTab />
        </div>
        <div className="chart-container">
          <Routes>
            <Route path="/" element={<EmployeesComponent />} />
            <Route path="/employee/:id" element={<SingleEmployeeComponent />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
