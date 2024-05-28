import {useFile} from '../components/connect/FileContext'
import axios from 'axios';
import React, { useState } from 'react';

function TrainTest() {
  const {fileId} = useFile();
  const [message, setMessage] = useState('');
  const [accuracy, setAccuracy] = useState<number | null>(null);

  const onTrainModel = async () => {
    if (!fileId) {
      setMessage('Please upload a file first.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/train`, {fileId});

      setMessage('Training started successfully.');
      setAccuracy(response.data.accuracy);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage('Error starting training: ' + (error.response?.data?.error || error.message));
      } else {
        setMessage('An unexpected error occurred: ' + (error as Error).message);
      }
    }
  };

  return (
    <div className="pl-20 pt-20 pr-20 text-white">
      <h1 className="text-3xl mb-10"><strong>Train and Test</strong></h1>

      <div className="flex gap-5 h-[60vh]">
        <div className="w-4/12 bg-slate-200 rounded-xl p-4">
          <h1 className="text-xl font-bold text-slate-800">Train</h1>
          <button 
            className="mt-10 bg-slate-400 p-6 rounded-xl border border-slate-700 w-full text-xl text-slate-800"
            onClick={onTrainModel}
          >Train and Test</button>
          {message && <p>{message}</p>}
          {accuracy !== null && (
            <div>
                <h3>Model Accuracy: {accuracy}</h3>
            </div>
          )}
        </div>
        <div className="w-8/12 bg-slate-200 rounded-xl p-4">
          <h1 className="text-xl font-bold text-slate-800">Object Class Distribution</h1>
        </div>

      </div>


    </div>
  )
}

export default TrainTest