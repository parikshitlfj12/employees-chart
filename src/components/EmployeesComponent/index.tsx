import React, { useState, useEffect } from "react";
import "./EmployeesComponent.css";
import { RootEmployeeObject, AuthorWorklogRow } from "../../types";
import { Menu } from '@mui/icons-material';

const SummaryCards = () => {
    const cards = [
        { title: 'Onboarding', count: 171, change: '+15% increase vs last month', bg: 'bg-primary' },
        { title: 'Onboarded', count: 128, change: '+15% increase vs last month', bg: 'bg-success' },
        { title: 'Drafts', count: 54, change: '+15% increase vs last month', bg: 'bg-warning' },
        { title: 'Reports', count: 322, change: '-2% decrease vs last month', bg: 'bg-danger' },
    ];

    return (
        <div className="summary-container">
            {cards.map((card, index) => (
                <div className="summary" key={index}>
                    <div className={`card text-white mb-3 ${card.bg}`}>
                        <div className="card-header">{card.title}</div>
                        <div className="card-body">
                            <h5 className="card-title">{card.count}</h5>
                            <p className="card-text">{card.change}</p>
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    );
};


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
            <SummaryCards />
            <div style={{textAlign:"start", width:"100%"}}>
                <h1>Employee's Details</h1>
            </div>
            <div className="employee-table">
                <div className="filters">
                    <select style={{backgroundColor: "#D3D3D3"}} onChange={(e) => handleEmployeeSelect(e.target.value)}>
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
