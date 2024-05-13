import { useState, ReactNode, useEffect } from "react"

function Model() {

  const [buttonPushed, setButtonPushed] = useState(0);
  const [content, setContent] = useState<ReactNode | null>(null);

  const showPrivate = () => {
    setContent(
      <div className="grid justify-center items-center">
        Seems you don't have any private models yet.
      </div>
    )
    setButtonPushed(1)
  }

  useEffect(() => {
    showPublic();
  }, [])

  const showPublic = () => {
    setContent(
      <div>
        <div className="flex mt-10 text-slate-800 ">
          <div className="w-3/12 bg-slate-200 border border-slate-500 p-3 h-[40vh]">
            <h1 className="text-md font-bold border-b border-slate-500">Name</h1>
          </div>
          <div className="w-1/12 bg-slate-200 border border-slate-500 p-3 h-[40vh]">
            <h1 className="text-md font-bold border-b border-slate-500">Runs</h1>
          </div>
          <div className="w-1/12 bg-slate-200 border border-slate-500 p-3 h-[40vh]">
            <h1 className="text-md font-bold border-b border-slate-500">Tests</h1>
          </div>
          <div className="w-2/12 bg-slate-200 border border-slate-500 p-3 h-[40vh]">
            <h1 className="text-md font-bold border-b border-slate-500">ID</h1>
          </div>
          <div className="w-2/12 bg-slate-200 border border-slate-500 p-3 h-[40vh]">
            <h1 className="text-md font-bold border-b border-slate-500">Reference ID</h1>
          </div>
          <div className="w-2/12 bg-slate-200 border border-slate-500 p-3 h-[40vh]">
            <h1 className="text-md font-bold border-b border-slate-500">Created at</h1>
          </div>
          <div className="w-1/12 bg-slate-200 border border-slate-500 p-3 h-[40vh]">
            <h1 className="text-md font-bold border-b border-slate-500">Tags</h1>
          </div>
        </div>
      </div>
    )
    setButtonPushed(2)
  }

  return (
    <div className="pl-20 pt-20 pr-20 text-white">
      <h1 className="text-3xl"><strong>Models</strong></h1>

      <div className="flex justify-between mt-10 text-lg">
        <div className="flex">
          <button
            className={`pl-5 pr-5 pt-3 pb-3 border border-slate-500 rounded-l-lg hover:bg-slate-600 ${buttonPushed === 1 ? 'bg-slate-500' : ''}`}
            onClick={showPrivate}
          >
            Private
          </button>
          <button
            className={`pl-5 pr-5 pt-3 pb-3 border border-slate-500 rounded-r-lg hover:bg-slate-600 ${buttonPushed === 2 ? 'bg-slate-500' : ''}`}
            onClick={showPublic}
          >
            Public
          </button>
        </div>
      </div>

      <div>{content}</div>




    </div>
  )
}

export default Model