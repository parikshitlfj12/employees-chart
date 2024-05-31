import React from "react";
import "./chartComponent.css";
import DayWiseActivityChart from "./dayWiseActivityChart";
import TotalActivityChart from "./totalActivityChart";
import { RootEmployeeObject } from "../../types";

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
