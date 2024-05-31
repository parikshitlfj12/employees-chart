import React, { useState, useEffect } from "react";
import "./EmployeesComponent.css";
import { RootEmployeeObject, AuthorWorklogRow } from "../../types";
import { Launch } from "@mui/icons-material";
import { fetchEmployeeData } from "../../services";
import Loader from "../shared/loader";

const SummaryCards = () => {
  const cards = [
    {
      title: "PR Merged",
      count: 13,
      change: "+15% increase vs last month",
      styles: {
        backgroundColor: "#D4EDDA",
        borderColor: "#C3E6CB",
        color: "#155724",
      },
    },
    {
      title: "PR Open",
      count: 15,
      change: "+12% increase vs last month",
      styles: {},
    },
    {
      title: "Total Commits",
      count: 99,
      change: "+15% increase vs last month",
      styles: {},
    },
    {
      title: "Reporting Alerts",
      count: 2,
      change: "-2% decrease vs last month",
      styles: {
        backgroundColor: "#F8D7DA",
        borderColor: "#F5C6CB",
        color: "#721C24",
      },
    },
  ];

  return (
    <div className="summary-container">
      {cards.map((card, index) => (
        <div className="summary" style={card.styles} key={index}>
          <div className="card">
            <div className="card-header">{card.title}</div>
            <div className="card-body">
              <h5 className="card-title">{card.count}</h5>
              <p className="card-text">{card.change}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const EmployeeComponent: React.FC = () => {
  const [data, setData] = useState<RootEmployeeObject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  // Data fetching from the MOCK API
  useEffect(() => {
    const fetchData = async () => {
      await fetchEmployeeData({ setData, setLoading });
    };
    fetchData();
  }, []);

  const handleEmployeeSelect = (employeeName: string) => {
    setSelectedEmployee((prevEmployee) =>
      prevEmployee === employeeName ? null : employeeName
    );
  };

  const renderTotalActivity = (
    totalActivity: AuthorWorklogRow["totalActivity"]
  ) => {
    return totalActivity.map((activity, index) => (
      <td key={index}>{activity.value}</td>
    ));
  };

  const renderDayWiseActivity = (
    dayWiseActivity: AuthorWorklogRow["dayWiseActivity"]
  ) => {
    return dayWiseActivity.map((day) => (
      <tr key={day.date}>
        <td>{day.date}</td>
        {day.items.children.map((item, index) => (
          <td
            key={index}
            style={{ backgroundColor: item.fillColor, color: "#fff" }}
          >
            {item.count}
          </td>
        ))}
      </tr>
    ));
  };

  const goToEmployeeProfile = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  if (loading) {
    return <div><Loader /></div>;
  }

  return (
    <div className="container">
      <SummaryCards />
      <div style={{ textAlign: "start", width: "100%" }}>
        <h1>Employee's Details</h1>
      </div>
      <div className="employee-table">
        <div className="filters">
          <select
            style={{ backgroundColor: "#D3D3D3" }}
            onChange={(e) => handleEmployeeSelect(e.target.value)}
          >
            <option value="">Select Employee</option>
            {data?.data?.AuthorWorklog?.rows.map((employee) => (
              <option key={employee.name} value={employee.name}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>PR Open</th>
              <th>PR Merged</th>
              <th>Commits</th>
              <th>PR Reviewed</th>
              <th>PR Comments</th>
              <th>Incident Alerts</th>
              <th>Incidents Resolved</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.AuthorWorklog?.rows.map((employee) => (
              <React.Fragment key={employee.name}>
                <tr
                  className={`employee-row ${
                    selectedEmployee === employee.name ? "selected" : ""
                  }`}
                  onClick={() => handleEmployeeSelect(employee.name)}
                >
                  <td>{employee.name}</td>
                  {renderTotalActivity(employee.totalActivity)}
                  <td onClick={goToEmployeeProfile}>
                    <Launch sx={{ color: "#007bff" }} />
                  </td>
                </tr>
                {selectedEmployee === employee.name &&
                  renderDayWiseActivity(employee.dayWiseActivity)}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeComponent;
