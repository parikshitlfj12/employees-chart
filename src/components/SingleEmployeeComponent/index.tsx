import React, { useEffect, useState } from "react";
import { fetchEmployeeWithName } from "../../services";
import { RootEmployeeObject } from "../../types";
import Loader from "../shared/loader";

type Props = {};

export default function SingleEmployeeComponent({}: Props) {
  const [data, setData] = useState<RootEmployeeObject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchEmployeeWithName({
        setData,
        setLoading,
        employeeName: "rishi@devdynamics.ai",
      });
    };
    fetchData();
  }, []);

  if (loading) {
    return <div><Loader /></div>;
  }

  return <div>SingleEmployeeComponent</div>;
}
