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
    console.log("JSONDATA === ", jsonData)
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

    console.log(updatedData)
    setData(updatedData);
    setLoading(false);
  } catch (error) {
    console.log(error);
    return null;
  }
};
