import { FaUpload } from "react-icons/fa6";
import { useState, ReactNode, useEffect } from "react"
import FileUpload from "../components/connect/FileUpload";

function Kernel() {

  const [buttonPushed, setButtonPushed] = useState(0);
  const [content, setContent] = useState<ReactNode | null>(null);

  const showPrivate = () => {
    setContent(

      <div className="flex mt-20 gap-10">
        <div className="w-4/12">
          <button className="border-2 p-7 bg-slate-300 rounded-xl flex gap-10 w-[100%]">
            <FaUpload className='text-5xl' />
            <div>
              <p><strong>Local Upload</strong></p>
              <p>Attach PNG or JPEG images.</p>
            </div>
          </button>
        </div>
        <button className="w-8/12 p-7 mr-10 bg-slate-300 border-2 rounded-xl grid justify-center">
          <img src="/assets/upload.png" alt="" className="w-[600px] " />
          <p className="grid justify-center text-xl">Drag and release here or click to upload your data</p>
          <FileUpload/>
        </button>
      </div>


    )
    setButtonPushed(1)
  }

  useEffect(() => {
    showPublic();
  }, [])

  const showPublic = () => {
    setContent(
      <div className="text-white">
        Public datasets
      </div>
    )
    setButtonPushed(2)
  }

  return (
    <>
      <div className="pl-20 pt-20">
        <div className="flex">
          <img
            className="w-[60px]"
            src="/assets/kernel.png"
            alt="" />
          <p className="text-white text-4xl"> &nbsp; Kernel</p>
        </div>

        <div className="flex justify-between mt-10 text-lg">
          <div className="flex">
            <button
              className={`pl-5 pr-5 pt-3 pb-3 border text-slate-200 border-slate-500 rounded-l-lg hover:bg-slate-600 ${buttonPushed === 1 ? 'bg-slate-500' : ''}`}
              onClick={showPrivate}
            >
              My datasets
            </button>
            <button
              className={`pl-5 pr-5 pt-3 pb-3 border border-slate-500 text-slate-200 rounded-r-lg hover:bg-slate-600 ${buttonPushed === 2 ? 'bg-slate-500' : ''}`}
              onClick={showPublic}
            >
              Public Datasets
            </button>
          </div>
        </div>

        <div>{content}</div>
      </div>
    </>
  )
}

export default Kernel