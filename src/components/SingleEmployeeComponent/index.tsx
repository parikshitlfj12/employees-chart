import React, { useEffect, useState } from "react";
import { fetchEmployeeWithName } from "../../services";
import { ActivityMeta, AuthorWorklogRow } from "../../types";
import Loader from "../shared/loader";
import BarChart from "../shared/dayWiseActivityChart";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import TotalActivityChart from "../shared/totalActivityChart";
import "./SingleEmployeeComponent.css";

type Props = {};

const GuideComponent = ({ colorTheme }: { colorTheme: ActivityMeta[] | undefined }) => {
  return (
    <ul className="legend">
      {colorTheme?.map((colr) => {
        return (
          <li className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: colr.fillColor }}
            ></div>
            {colr.label}
          </li>
        );
      })}
    </ul>
  );
};

export default function SingleEmployeeComponent({}: Props) {
  const navigate = useNavigate();
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
      <div style={{ marginTop: "16px" }}>
        <div
          style={{ display: "flex", alignItems: "center", columnGap: "8px" }}
        >
          <ArrowBack
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />{" "}
          <p style={{ fontWeight: "bold" }}>Go back</p>
        </div>
        <h1>{data?.name}'s Data</h1>
      </div>
      <GuideComponent colorTheme={colorTheme} />

      <div>
        <div
          style={{
            height: 600,
            width: "100%",
            paddingBottom: "30px",
            boxShadow: "0px 10px 40px 0px #CCCCCC",
          }}
        >
          <div>
            <h3 style={{ marginBottom: "8px", display: "inline" }}>
              Day-wise GitHub Contribution Analysis:
            </h3>
            <p
              style={{
                fontSize: "14px",
                display: "inline",
                paddingLeft: "16px",
              }}
            >
              Tracking PRs opened, closed, and comments provides insights into{" "}
              {id} daily engagement, productivity, and collaboration
              effectiveness on GitHub.
            </p>
          </div>
          <BarChart data={data?.dayWiseActivity} activityMeta={colorTheme} />
        </div>
        <div
          style={{
            marginTop: "50px",
            height: 600,
            width: "100%",
            boxShadow: "0px 10px 40px 0px #CCCCCC",
          }}
        >
          <div>
            <h3 style={{ marginBottom: "8px", display: "inline" }}>
              Overall GitHub Contribution Analysis:
            </h3>
            <p
              style={{
                fontSize: "14px",
                display: "inline",
                paddingLeft: "16px",
              }}
            >
              Examining PRs opened, closed, and comments offers a comprehensive
              view of {id} collective impact, productivity trends, and
              collaboration efficiency across their GitHub contributions.
            </p>
          </div>
          <TotalActivityChart
            data={data?.totalActivity}
            activityMeta={colorTheme}
          />
        </div>
      </div>
    </div>
  );
}
