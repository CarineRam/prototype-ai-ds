import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Visualization() {
  const [histogramSrc, setHistogramSrc] = useState('')
  const [heatmapSrc, setHeatmapSrc] = useState('')
  const [residualPlotSrc, setResidualPlotSrc] = useState('')

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const histogramResponse = await axios.post('http://localhost:5000/generate_histogram', {}, { responseType: 'blob' });
        const histogramUrl = URL.createObjectURL(new Blob([histogramResponse.data], { type: 'image/png' }));
        setHistogramSrc(histogramUrl);

        const heatmapResponse = await axios.post('http://localhost:5000/generate_heatmap', {}, { responseType: 'blob' });
        const heatmapUrl = URL.createObjectURL(new Blob([heatmapResponse.data], { type: 'image/png' }));
        setHeatmapSrc(heatmapUrl);

        const residualPlotResponse = await axios.post('http://localhost:5000/generate_residual_plot', {}, { responseType: 'blob' });
        const residualPlotUrl = URL.createObjectURL(new Blob([residualPlotResponse.data], { type: 'image/png' }));
        setResidualPlotSrc(residualPlotUrl);
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
            {/* <Histogram/> */}
          </div>
          <div className="bg-slate-200 border border-slate-500 rounded-xl p-3 h-min-[40vh]">
            <h1 className="text-xl font-bold">Heatmap</h1>
            {heatmapSrc && <img src={heatmapSrc} alt="heatmap"/>}
            {/* <Heatmap/> */}
          </div>
          <div className="bg-slate-200 border border-slate-500 rounded-xl p-3 h-min-[40vh]">
            <h1 className="text-xl font-bold">Residual Plot</h1>
            {residualPlotSrc && <img src={residualPlotSrc} alt="Residual Plot"/>}
            {/* <ResidualPlot/> */}
          </div>
        </div>


      </div>
    </>
  )
}

export default Visualization