import axios from 'axios';
import React, { useState, ChangeEvent } from 'react';
import Histogram from "../components/connect/Histogram"

function TrainTest() {
  const [trainPercentage, setTrainPercentage] = useState<number>(0);
  const [testPercentage, setTestPercentage] = useState<number>(0);
  const [visualizationData, setvisualizationData] = useState(null);
  const [error, setError] = useState('');
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [imageSrc, setImageSrc] = useState('');

  const handleTrainChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTrainPercentage(e.target.valueAsNumber);
  }
  const handleTestChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTestPercentage(e.target.valueAsNumber);
  }

  const onSplitModel = async () => {
    console.log("Split button pushed")
    if ((trainPercentage || 0) + (testPercentage || 0) !== 100) {
      setError('The sum of train and test percentages must be 100.');
      return;
    }
    try {
      const trainFraction = (trainPercentage || 0) / 100;
      const testFraction = (testPercentage || 0) / 100;
      const response = await axios.post('http://localhost:5000/split_data', {
        trainPercentage: trainFraction,
        testPercentage: testFraction,
      });
      setvisualizationData(response.data);
      setError('');
    } catch (error) {
      console.error('Error splitting data:', error);
      setError('Error splitting data. Please try again.');
    }
  };


  const onTrainModel = () => {
    console.log("Train button pushed")
    axios.post('http://localhost:5000/train_model', { trainPercentage })
      .then(response => {
        setAccuracy(response.data.accuracy);
        console.log('Model trained successfully:', response.data);

        generateHistogramAndHeatmap();
      })
      .catch(error => {
        console.error('Error training model:', error.response ? error.response.data : error.message);
      });

  }

  const generateHistogramAndHeatmap = () => {
    // axios.post('http://localhost:5000/generate_histogram', {}, {
    //   responseType: 'blob'
    // })
    //   .then(response => {
    //     const url = URL.createObjectURL(new Blob([response.data], { type: 'image/png' }));
    //     setImageSrc(url);
    //   })
    //   .catch(error => {
    //     console.error('Error generating histogram:', error.response ? error.response.data : error.message);
    //   });

    axios.post('http://localhost:5000/generate_precision_recall', {}, {
      responseType: 'blob'
    })
      .then(response => {
        const urlRP = URL.createObjectURL(new Blob([response.data], { type: 'image/png' }));
        setImageSrc(urlRP);
      })
      .catch(error => {
        console.error('Error generating residual plot:', error.response ? error.response.data : error.message);
      });
  }

  return (
    <div className="pl-20 pt-20 pr-20 text-white">
      <h1 className="text-3xl mb-10"><strong>Train and Test</strong></h1>

      <div className="flex gap-5 h-min-[60vh] text-slate-800">
        <div className="w-4/12 bg-slate-200 rounded-xl p-4">
          <h1 className="text-xl font-bold text-slate-800">Train</h1>
          <div className='text-lg flex h-10 mb-5 mt-5'>
            <label className='w-4/12'>Train Percentage:</label>
            <input className='w-8/12 pl-3 border border-slate-800 rounded-lg' type="number" value={trainPercentage} onChange={handleTrainChange} max={100} min={0} />
          </div>
          <div className='text-lg flex h-10 mb-5 mt-5'>
            <label className='w-4/12'>Test Percentage:</label>
            <input className='w-8/12 pl-3 border border-slate-800 rounded-lg' type="number" value={testPercentage} onChange={handleTestChange} />
          </div>
          <button
            className="mt-5 bg-slate-400 p-6 rounded-xl border border-slate-700 w-full text-xl text-slate-800"
            onClick={onSplitModel}
          >Split dataset</button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button
            onClick={onTrainModel}
            className="mt-5 bg-slate-400 p-6 rounded-xl border border-slate-700 w-full text-xl text-slate-800"
          >Train and Test dataset</button>
          {accuracy && (
            <>
              <div>Model Accuracy: {accuracy}</div>
            </>
          )}
        </div>
        <div className="w-8/12 bg-slate-200 rounded-xl p-4">
          <h1 className="text-xl font-bold text-slate-800">Confusion Matrix</h1>

          <div>
            {imageSrc && <img src={imageSrc} alt="Histogram" />}
          </div>
        </div>

      </div>


    </div>
  )
}

export default TrainTest