import { AuthorWorklogRow, RootEmployeeObject } from "../types";

// Fetch all data from mock File
export const fetchEmployeeData = async ({ setData, setLoading }: any) => {
  try {
    setLoading(true);
    const response = await fetch("./data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Network response was not ok, status: ${response.status}`
      );
    }

    const jsonData: RootEmployeeObject = await response.json();
    setData(jsonData);
    setLoading(false);
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Fetch employee data
export const fetchEmployeeWithName = async ({
  employeeName,
  setColorTheme,
  setData,
  setLoading,
}: any) => {
  try {
    setLoading(true);
    const response = await fetch("../data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Network response was not ok, status: ${response.status}`
      );
    }

    const jsonData: RootEmployeeObject = await response.json();
    const updatedData = jsonData?.data?.AuthorWorklog?.rows?.filter(
      (item: AuthorWorklogRow) => {
        return item.name === employeeName;
      }
    );

    setData(updatedData?.[0]);
    setColorTheme(jsonData?.data?.AuthorWorklog?.activityMeta)
    setLoading(false);
  } catch (error) {
    console.log(error);
    return null;
  }
};
