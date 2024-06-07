import Histogram from "../components/connect/Histogram"
import Heatmap from "../components/connect/Heatmap"
import ResidualPlot from "../components/connect/ResidualPlot"

function Visualization() {
  return (
    <>
      <div className="pl-20 pt-20 pr-20 text-white">
        <h1 className="text-3xl"><strong>Visualization</strong></h1>

        <div className="grid grid-cols-2 mt-10  gap-7 text-slate-800 ">
          <div className="bg-slate-200 border border-slate-500 rounded-xl p-3 h-min-[40vh]">
            <h1 className="text-xl font-bold">Confusion Matrix</h1>
            <Histogram/>
          </div>
          <div className="bg-slate-200 border border-slate-500 rounded-xl p-3 h-min-[40vh]">
            <h1 className="text-xl font-bold">Heatmap</h1>
            <Heatmap/>
          </div>
          <div className="bg-slate-200 border border-slate-500 rounded-xl p-3 h-min-[40vh]">
            <h1 className="text-xl font-bold">Residual Plot</h1>
            <ResidualPlot/>
          </div>
        </div>


      </div>
    </>
  )
}

export default Visualization