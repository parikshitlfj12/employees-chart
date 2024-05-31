import React from "react";
import "./chartComponent.css";
import DayWiseActivityChart from "../dayWiseActivityChart";
import TotalActivityChart from "../totalActivityChart";
import { RootEmployeeObject } from "../../types";

const data = {
    AuthorWorklog: {
        activityMeta: [
            { label: "PR Open", fillColor: "#EF6B6B" },
            { label: "PR Merged", fillColor: "#61CDBB" },
            { label: "Commits", fillColor: "#FAC76E" },
            { label: "PR Reviewed", fillColor: "#C2528B" },
            { label: "PR Comments", fillColor: "#0396A6" },
            { label: "Incident Alerts", fillColor: "#5F50A9" },
            { label: "Incidents Resolved", fillColor: "#8F3519" },
        ],
        rows: [
            {
                name: "rishi@devdynamics.ai",
                totalActivity: [
                    { name: "PR Open", value: "1" },
                    { name: "PR Merged", value: "1" },
                    { name: "Commits", value: "49" },
                    { name: "PR Reviewed", value: "19" },
                    { name: "PR Comments", value: "4" },
                    { name: "Incident Alerts", value: "0" },
                    { name: "Incidents Resolved", value: "0" },
                ],
                dayWiseActivity: [
                    {
                        date: "2024-05-06",
                        items: {
                            children: [
                                { count: "0", label: "PR Open", fillColor: "#EF6B6B" },
                                { count: "0", label: "PR Merged", fillColor: "#61CDBB" },
                                { count: "7", label: "Commits", fillColor: "#FAC76E" },
                                { count: "2", label: "PR Reviewed", fillColor: "#C2528B" },
                                { count: "0", label: "PR Comments", fillColor: "#0396A6" },
                                { count: "0", label: "Incident Alerts", fillColor: "#5F50A9" },
                                { count: "0", label: "Incidents Resolved", fillColor: "#8F3519" },
                            ],
                        },
                    },
                    {
                        date: "2024-05-07",
                        items: {
                            children: [
                                { count: "1", label: "PR Open", fillColor: "#EF6B6B" },
                                { count: "0", label: "PR Merged", fillColor: "#61CDBB" },
                                { count: "7", label: "Commits", fillColor: "#FAC76E" },
                                { count: "4", label: "PR Reviewed", fillColor: "#C2528B" },
                                { count: "1", label: "PR Comments", fillColor: "#0396A6" },
                                { count: "0", label: "Incident Alerts", fillColor: "#5F50A9" },
                                { count: "0", label: "Incidents Resolved", fillColor: "#8F3519" },
                            ],
                        },
                    },
                ],
            },
        ],
    },
};

const App: React.FC = () => {
    const [data, setData] = React.useState<RootEmployeeObject>();
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        fetch('/data.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data: RootEmployeeObject) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    console.log(data)
    return (
        <div className="container">
            <div className="title">Total Activity</div>
            {data?.data?.AuthorWorklog?.rows.map(employee => (
                <>
                    <div className="chart-container">
                        <TotalActivityChart
                            data={employee?.totalActivity}
                            activityMeta={data?.data?.AuthorWorklog?.activityMeta}
                        />
                    </div>
                    <div className="title">Day Wise Activity</div>
                    <div className="chart-container">
                        <DayWiseActivityChart
                            activityMeta={data?.data.AuthorWorklog.activityMeta ?? []}
                            data={employee?.dayWiseActivity}
                        />
                    </div>
                </>
            ))}


        </div>
    );
};

export default App;
