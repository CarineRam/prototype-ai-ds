import { Link } from 'react-router-dom';


// type Props = {}{}: Props

function Demo() {
  // const [fileName, setFileName] = useState("No selected file")
  return (
    <>
      <div className='flex w-[100vw] bg-slate-800'>
        <div className="w-[15vw] bg-slate-600 min-h-[100vh] text-white border-r overflow-auto">
          <div className="grid justify-center xl:mb-3">
            <img src="/assets/logo.png" className="w-[140px]" alt="" />
          </div>
        </div>

        <div className="pl-20 pt-20">
          <p className="text-white  text-4xl">Welcome to Refonte Prototype! Chose your exercise!</p>
          <div className='pl-10 pt-10 grid gap-20 grid-cols-2 '>
            <div>
              <Link
                className='bg-slate-600 xl:p-10 p-2 border rounded-xl w-80 h-80 flex flex-col justify-center items-center'
                to="/summary"
              >
                <img
                  className="w-[140px]"
                  src="/assets/magical_codex.png"
                  alt=""
                />
                <p className="text-white text-3xl p-5">
                  Magical codex
                </p>
              </Link>
            </div>
            <div>
              <Link
                className='bg-slate-600 xl:p-10 p-2 border rounded-xl w-80 h-80 flex flex-col justify-center items-center'
                to="/kernel"
              >
                <img
                  className="w-[140px]"
                  src="/assets/kernel.png"
                  alt=""

                />
                <p className=" text-white text-3xl p-5">
                  Kernel
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Demo