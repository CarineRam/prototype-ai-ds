import { IoSearchCircle } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa6";
import { IoIosApps } from "react-icons/io";
import { IoGitNetwork } from "react-icons/io5";
import { FaUpload } from "react-icons/fa6";
import { FaBookReader } from "react-icons/fa";

function AppVariants() {
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

      <div className="flex mt-10 items-center">
        <FaRegCircle />
        <p className="text-xl">&nbsp; Last Update</p>
      </div>

      <div className="ml-7 mt-5 bg-slate-200 text-slate-800 p-4 border border-slate-600 rounded-xl">
        <div className="flex mb-5">
          <IoIosApps className="text-2xl"/><p className="text-xl">&nbsp;Variant</p>
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
            <div>Id</div>
            <div>Model</div>
            <div>Temperature</div>
            <div>Max Tokens</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppVariants