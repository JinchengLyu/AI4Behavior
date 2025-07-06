import React, { useEffect, useState } from "react";
import { BACKEND, filterLabels } from "../consts";
import "./StatTable.css";

const StatTable = () => {
  const [field1Values, setField1Values] = useState([]);
  const [field2Values, setField2Values] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    // Fetch distinct values for field1
    fetch(`${BACKEND}/api/distinct/${filterLabels[0]}`)
      .then((response) => response.json())
      .then((data) => {
        setField1Values(data.distinctValues);
        setField1Values((prev) => [...prev, ""]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // Fetch distinct values for field2
    fetch(`${BACKEND}/api/distinct/${filterLabels[1]}`)
      .then((response) => response.json())
      .then((data) => {
        setField2Values(data.distinctValues);
        setField2Values((prev) => [...prev, ""]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch stats for each combination of field1 and field2 values
    const fetchData = async () => {
      const tempStats = {};
      for (const value1 of field1Values) {
        tempStats[value1] = {};
        for (const value2 of field2Values) {
          try {
            const response = await fetch(`${BACKEND}/api/count`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                field1: filterLabels[0],
                value1,
                field2: filterLabels[1],
                value2,
              }),
            });
    
            if (response.ok) {
              const data = await response.json();
              tempStats[value1][value2] = data.count;
            } else {
              console.error('Error fetching data:', response.statusText);
            }
          } catch (error) {
            console.error('Network error:', error);
          }
        }
      }
      setStats(tempStats);
    };
    
    if (field1Values.length && field2Values.length) {
      fetchData();
    }    
  }, [field1Values, field2Values]);

  return (
    <table border="1">
      <thead>
        <tr>
          <th rowSpan="2">{filterLabels[0]}</th>
          <th colSpan={field2Values.length}>{filterLabels[1]}</th>
        </tr>
        <tr>
          {field2Values.map((value) => (
            <th key={value}>{value === "" ? "Summary" : value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {field1Values.map((value1) => (
          <tr key={value1}>
            <th>{value1 === "" ? "Summary" : value1}</th>
            {field2Values.map((value2) => (
              <td key={value2}>{stats[value1] && stats[value1][value2]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StatTable;
