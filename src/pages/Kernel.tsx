import { FaUpload } from "react-icons/fa6";

function Kernel() {
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
          <div className="w-8/12 p-7 mr-10 bg-slate-300 border-2 rounded-xl grid justify-center">
            <img src="/assets/upload.png" alt="" className="w-[600px] " />
            <p className="grid justify-center text-xl">Drag and release here or click to upload your data</p>
          </div>
        </div>

      </div>

    </>
  )
}

export default Kernel