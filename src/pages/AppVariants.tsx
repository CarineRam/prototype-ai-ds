import { IoSearchCircle } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa6";
import { IoIosApps } from "react-icons/io";
import { IoGitNetwork } from "react-icons/io5";
import { FaUpload } from "react-icons/fa6";
import { FaBookReader } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from 'axios'

interface Parameter {
  id: number;
  name: string;
  model: string;
  temperature: number;
  max_tokens: number;
  stop_sequences: string;
  save_date: string;
}

function AppVariants() {
  const [parameters, setParameters] = useState<Parameter[]>([]);

  useEffect(() => {
    axios.get<Parameter[]>('http://localhost:5000/magicalCodex/view_parameters')
      .then(response => {
        setParameters(response.data.reverse())
        console.log(response.data)
      })
      .catch(error => {
        console.error('There was an error fetching the parameters!', error)
      })
  }, []);

  return (
    <div className="pl-20 pt-20 pr-20 text-white">
      <h1 className="text-3xl"><strong>App Variants</strong></h1>

      <div className="flex -full h-12 rounded-xl border bg-white border-slate-400 mt-7 items-center">
        <IoSearchCircle className="text-3xl text-slate-800 m-3" />
        <input
          type="text"
          className="h-full w-full rounded-r-xl"
          placeholder="Filter App Variants"
        />
      </div>

      {parameters.map((param: Parameter) => (
        <div key={param.id}>
          <div className="flex mt-10 items-center">
            <FaRegCircle />
            <p className="text-xl">&nbsp; {param.save_date}</p>
          </div>

          <div className="ml-7 mt-5 bg-slate-200 text-slate-800 p-4 border border-slate-600 rounded-xl">
            <div className="flex mb-5">
              <IoIosApps className="text-2xl" /><p className="text-xl">&nbsp;{param.name}</p>
            </div>
            <div className="flex gap-5 text-xl">
              <a
                className="flex p-2 pl-4 pr-4 border border-slate-800 rounded-xl items-center"
                href="/prompt"
              >
                <IoGitNetwork />&nbsp;Fork
              </a>
              <button className="flex p-2 pl-4 pr-4 border border-slate-800 rounded-xl items-center"><FaUpload />&nbsp;Deploy</button>
              <button className="flex p-2 pl-4 pr-4 border border-slate-800 rounded-xl items-center"><FaBookReader />&nbsp;View or Run Evaluations</button>
            </div>

            <div className="flex mt-10 gap-8">
              <div className="w-8/12 rounded-xl border border-slate-800 p-3 h-32 overflow-y-auto">
                <p>Prompt Template</p>
              </div>
              <div className="w-4/12 text-lg grid grid-rows-4">
                <div>Id: {param.id}</div>
                <div>Model: {param.model}</div>
                <div>Temperature: {param.temperature}</div>
                <div>Max Tokens: {param.max_tokens}</div>
                <div>Stop Sequence: {param.stop_sequences}</div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* <div>
        <h1>Saved Parameters</h1>
        
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Model</th>
              <th>Temperature</th>
              <th>Max Tokens</th>
              <th>Stop Sequences</th>
              <th>Save Date</th>
            </tr>
          </thead>
          <tbody>
            {parameters.map((param: Parameter) => (
              <tr key={param.id}>
                <td>{param.id}</td>
                <td>{param.name}</td>
                <td>{param.model}</td>
                <td>{param.temperature}</td>
                <td>{param.max_tokens}</td>
                <td>{param.stop_sequences}</td>
                <td>{param.save_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

    </div>
  )
}

export default AppVariants