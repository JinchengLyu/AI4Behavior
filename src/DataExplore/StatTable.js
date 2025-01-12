import React, { useEffect, useState } from "react";
import { BACKEND, filterLabels } from "../consts";
import axios from "axios";
import "./StatTable.css";

const StatTable = () => {
  const [field1Values, setField1Values] = useState([]);
  const [field2Values, setField2Values] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    // Fetch distinct values for field1
    axios.get(`${BACKEND}/api/distinct/${filterLabels[0]}`).then((response) => {
      setField1Values(response.data.distinctValues);
      setField1Values((prev) => [...prev, ""]);
    });

    // Fetch distinct values for field2
    axios.get(`${BACKEND}/api/distinct/${filterLabels[1]}`).then((response) => {
      setField2Values(response.data.distinctValues);
      setField2Values((prev) => [...prev, ""]);
    });
  }, []);

  useEffect(() => {
    // Fetch stats for each combination of field1 and field2 values
    const fetchData = async () => {
      const tempStats = {};
      for (const value1 of field1Values) {
        tempStats[value1] = {};
        for (const value2 of field2Values) {
          const response = await axios.post(`${BACKEND}/count`, {
            field1: filterLabels[0],
            value1,
            field2: filterLabels[1],
            value2,
          });
          tempStats[value1][value2] = response.data.count;
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
            <th key={value}>{value === "" ? "summary" : value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {field1Values.map((value1) => (
          <tr key={value1}>
            <th>{value1 === "" ? "summary" : value1}</th>
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
