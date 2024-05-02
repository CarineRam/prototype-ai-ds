// import React from 'react'

// type Props = {}{}: Props

function index() {
  return (
    <>
      <div className="ai-ds-prototype min-h-[100vh] bg-slate-900 w-[100vw] ">
        <div className="xl:pt-28 xl:pl-36 pt-10 pl-10">
          <p className="xl:text-4xl text-gray-300 text-lg xl:pb-10">Refonte Prototype for Demo</p>
        </div>
        <div style={{ width: '100%', height: '1px', backgroundColor: 'gray' }}></div>
        <div className="flex xl:gap-16 gap-5 text-gray-300 xl:mt-16 mt-7 xl:pl-36 pl-10 xl:pr-28 pr-10 pb-10">
          <div className="w-3/12 bg-slate-600 rounded-xl xl:p-10 p-2 border">
            <button className="bg-slate-200 text-slate-900 xl:p-5 p-2 w-[100%] rounded-lg border border-slate-900 hover:bg-slate-900 hover:text-slate-200 hover:border-slate-200">
              Dataset
            </button>
            <button className="bg-slate-200 text-slate-900 xl:p-5 mt-5 p-2 xl:mt-10 w-[100%] rounded-lg border border-slate-900 hover:bg-slate-900 hover:text-slate-200 hover:border-slate-200">
              Model
            </button>
          </div>
          <div className="w-6/12">
            <div className="bg-slate-200 rounded-xl p-10 border-2 text-gray-800 h-[50vh] ">
              test
              
            </div>
            <div className="grid">
              <button className="bg-slate-200 text-slate-900 mt-10 rounded-lg border border-slate-900 justify-center hover:text-slate-200 hover:bg-slate-700">
                <p className="justify-center pt-5 pb-5 pl-10 pr-10">Upload</p>
              </button>
            </div>
          </div>
          <div className="w-3/12 bg-slate-600 rounded-xl xl:pl-10 xl:pr-10 border pt-[50vh]">
            <div className="xl:pb-10 pb-2 p-2">
              <button className="bg-slate-200 text-slate-900 xl:p-5 p-2 w-[100%] rounded-lg border border-slate-900 hover:bg-slate-900 hover:text-slate-200 hover:border-slate-200">
                Train & Test
              </button>
              <button className="bg-slate-200 text-slate-900 xl:p-5 p-2 xl:mt-10 mt-5 w-[100%] rounded-lg border border-slate-900 hover:bg-slate-900 hover:text-slate-200 hover:border-slate-200">
                Vizualize
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default index