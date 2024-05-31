import React, { useState, useEffect } from "react";
import "./EmployeesComponent.css";
import { RootEmployeeObject, AuthorWorklogRow } from "../../types";
import { Menu } from '@mui/icons-material';

const App: React.FC = () => {
    const [data, setData] = useState<RootEmployeeObject | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

    // Data fetching from the MOCK API
    useEffect(() => {
        fetch('/data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data: RootEmployeeObject) => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setLoading(false);
            });
    }, []);

    const handleEmployeeSelect = (employeeName: string) => {
        setSelectedEmployee(prevEmployee => prevEmployee === employeeName ? null : employeeName);
    };

    const renderTotalActivity = (totalActivity: AuthorWorklogRow["totalActivity"]) => {
        return totalActivity.map((activity, index) => (
            <td key={index}>{activity.value}</td>
        ));
    };

    const renderDayWiseActivity = (dayWiseActivity: AuthorWorklogRow["dayWiseActivity"]) => {
        return dayWiseActivity.map(day => (
            <tr key={day.date}>
                <td>{day.date}</td>
                {day.items.children.map((item, index) => (
                    <td key={index} style={{ backgroundColor: item.fillColor, color: '#fff' }}>
                        {item.count}
                    </td>
                ))}
            </tr>
        ));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="title">Employee's Details</div>
            <div className="employee-table">
                <div className="filters">
                    <select onChange={(e) => handleEmployeeSelect(e.target.value)}>
                        <option value="">Select Employee</option>
                        {data?.data?.AuthorWorklog?.rows.map(employee => (
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
                        {data?.data?.AuthorWorklog?.rows.map(employee => (
                            <React.Fragment key={employee.name}>
                                <tr className={`employee-row ${selectedEmployee === employee.name ? 'selected' : ''}`} onClick={() => handleEmployeeSelect(employee.name)}>
                                    <td>{employee.name}</td>
                                    {renderTotalActivity(employee.totalActivity)}
                                    <td><Menu /></td>
                                </tr>
                                {selectedEmployee === employee.name && renderDayWiseActivity(employee.dayWiseActivity)}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default App;
