import React, { useEffect, useState } from "react";
import { fetchEmployeeWithName } from "../../services";
import { ActivityMeta, AuthorWorklogRow } from "../../types";
import Loader from "../shared/loader";
import BarChart from "../shared/dayWiseActivityChart";
import { useParams } from "react-router-dom";
import TotalActivityChart from "../shared/totalActivityChart";

type Props = {};

export default function SingleEmployeeComponent({}: Props) {
  const { id } = useParams();
  const [data, setData] = useState<AuthorWorklogRow | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [colorTheme, setColorTheme] = useState<ActivityMeta[]>();

  useEffect(() => {
    const fetchData = async () => {
      await fetchEmployeeWithName({
        setData,
        setLoading,
        setColorTheme,
        employeeName: id,
      });
    };
    fetchData();
  }, []);

  console.log(data, id);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div style={{ padding: " 0 50px" }}>
      <div>
        <h1>{data?.name}'s Data</h1>
      </div>
      <div style={{ height: 500 }}>
        <BarChart data={data?.dayWiseActivity} activityMeta={colorTheme} />
        <TotalActivityChart data={data?.totalActivity} activityMeta={colorTheme}/>
      </div>
    </div>
  );
}
