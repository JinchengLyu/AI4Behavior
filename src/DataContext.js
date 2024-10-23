import React, { createContext, useState, useEffect } from 'react';
import Papa from 'papaparse';
import csvFile from './AI4BehaviourDataSet/data.csv';  // Ensure this path is correct

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // console.log('Fetching CSV file...');
        fetch(csvFile)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(text => {
                // console.log('CSV file fetched successfully');
                Papa.parse(text, {
                    header: true,
                    dynamicTyping: true,
                    complete: (results) => {
                        // console.log('CSV parsed successfully', results.data);
                        setData(results.data);
                    },
                    error: (err) => {
                        console.error('Error parsing CSV:', err);
                    }
                });
            })
            .catch(error => console.error('Error fetching CSV file:', error));
    }, []);
    

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };
