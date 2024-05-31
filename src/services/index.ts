import { RootEmployeeObject } from "../types";

// Fetch data from mock File
export const fetchEmployeeData = async () => {
  try {
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
    return jsonData;
  } catch (error) {
    console.log(error);
    return null;
  }
};
