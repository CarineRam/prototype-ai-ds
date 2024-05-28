import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface DataRow {
  [key: string]: string;
}

function PreviewDataset() {
  const { fileId } = useParams<{ fileId: string }>();
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.get(`http://localhost:5000/data/${fileId}`);
        const parsedData = JSON.parse(response.data.rows);
        setData(parsedData.data);
        setColumns(response.data.columns);
        console.log(parsedData.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fileId]);

  if (!data.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="pl-20 pt-20 pr-20 text-white">
        <h1 className="text-3xl"><strong>Preview Dataset</strong></h1>

        {/* <div className="flex justify-between mt-10 text-lg">
          <div className="flex">
            <button
              className={`pl-5 pr-5 pt-3 pb-3 border text-slate-200 border-slate-500 rounded-l-lg hover:bg-slate-600 ${buttonPushed === 1 ? 'bg-slate-500' : ''}`}
            // onClick={showPrivate}
            >
              My datasets
            </button>
            <button
              className={`pl-5 pr-5 pt-3 pb-3 border border-slate-500 text-slate-200 rounded-r-lg hover:bg-slate-600 ${buttonPushed === 2 ? 'bg-slate-500' : ''}`}
            // onClick={showPublic}
            >
              Public Datasets
            </button>
          </div>
        </div> */}

        <div>
          <div className="bg-slate-200 mt-10 rounded-xl p-4">
            <h1 className="text-xl font-bold text-slate-800">Choose your features: </h1>

            <div className="flex mt-5 text-slate-800 ">
              <h2>First 10 Rows</h2>
              <table>
                <thead>
                  <tr>
                    {columns.map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      {columns.map((col) => (
                        <td key={col}>{row[col]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default PreviewDataset