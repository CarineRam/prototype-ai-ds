import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Visualization() {
  const [histogramSrc, setHistogramSrc] = useState('')
  const [heatmapSrc, setHeatmapSrc] = useState('')
  const [precisionRecallSrc, setPrecisionRecallSrc] = useState('')

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const histogramResponse = await axios.post('http://localhost:5000/generate_histogram', {}, { responseType: 'blob' });
        const histogramUrl = URL.createObjectURL(new Blob([histogramResponse.data], { type: 'image/png' }));
        setHistogramSrc(histogramUrl);

        const heatmapResponse = await axios.post('http://localhost:5000/generate_heatmap', {}, { responseType: 'blob' });
        const heatmapUrl = URL.createObjectURL(new Blob([heatmapResponse.data], { type: 'image/png' }));
        setHeatmapSrc(heatmapUrl);

        const precisionRecallResponse = await axios.post('http://localhost:5000/generate_precision_recall', {}, { responseType: 'blob' });
        const precisionRecallUrl = URL.createObjectURL(new Blob([precisionRecallResponse.data], { type: 'image/png' }));
        setPrecisionRecallSrc(precisionRecallUrl);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error fetching images:', error.response ? error.response.data : error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };

    fetchImages();
  }, [])

  return (
    <>
      <div className="pl-20 pt-20 pr-20 text-white">
        <h1 className="text-3xl"><strong>Visualization</strong></h1>

        <div className="grid grid-cols-2 mt-10  gap-7 text-slate-800 ">
          <div className="bg-slate-200 border border-slate-500 rounded-xl p-3 h-min-[40vh]">
            <h1 className="text-xl font-bold">Confusion Matrix</h1>
            {histogramSrc && <img src={histogramSrc} alt="Histogram"/>}
          </div>
          <div className="bg-slate-200 border border-slate-500 rounded-xl p-3 h-min-[40vh]">
            <h1 className="text-xl font-bold">Heatmap</h1>
            {heatmapSrc && <img src={heatmapSrc} alt="heatmap"/>}
          </div>
          <div className="bg-slate-200 border border-slate-500 rounded-xl p-3 h-min-[40vh]">
            <h1 className="text-xl font-bold">Precision Recall</h1>
            {precisionRecallSrc && <img src={precisionRecallSrc} alt="Precision Recall"/>}
          </div>
        </div>


      </div>
    </>
  )
}

export default Visualization