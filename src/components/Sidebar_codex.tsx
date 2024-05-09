
import { BsFillHouseFill } from "react-icons/bs";
import { SlChemistry } from "react-icons/sl";
import { AiTwotoneSetting } from "react-icons/ai";
import { FaCubes } from "react-icons/fa6";
import { FaBalanceScale } from "react-icons/fa";
import { MdOutlineMenuBook } from "react-icons/md";
import { Link } from "react-router-dom";


function Sidebar() {
  return (
    <>
      <div className="w-[15vw] bg-slate-600 min-h-[100vh] text-white border-r fixed">
        <div className="grid justify-center xl:mb-3">
          <a href='/demo'>
            <img src="/assets/logo.png" className="w-[140px]" alt="" />
          </a>
        </div>
        <div className="xl:pl-10 pl-5">
          <ul className='grid grid-cols-1'>
            <li>
              <Link 
                className='pl-5 pt-5 pb-5 mb-5 flex'
                to='/summary'>
                <BsFillHouseFill className="text-2xl" /> <p className='text-xl'>&nbsp;Summary</p>
              </Link>
            </li>
            <li>
              <Link 
                className='pl-5 pt-5 pb-5 mb-5 flex'
                to='/prompt'>
                <SlChemistry className="text-2xl" /><p className='text-xl'> &nbsp; Prompt</p>
              </Link>
            </li>
            <li>
              <Link 
                className='pl-5 pt-5 pb-5 mb-5 flex'
                to='/finetuning'>
                <AiTwotoneSetting className="text-2xl" /><p className='text-xl'>&nbsp;Fine Tuning</p>
              </Link>
            </li>
            <li>
              <Link 
                className='pl-5 pt-5 pb-5 mb-5 flex'
                to='/appvariants'>
                <FaCubes className="text-2xl" /><p className='text-xl'>&nbsp; App Variants</p>
              </Link>
            </li>
            <li>
              <Link 
                className='pl-5 pt-5 pb-5 mb-5 flex'
                to='/compare'>
                <FaBalanceScale className="text-2xl" /><p className='text-xl'>&nbsp; Compare</p>
              </Link>
            </li>
            <li>
              <Link 
                className='pl-5 pt-5 pb-5 flex'
                to='/review'>
                <MdOutlineMenuBook className="text-2xl" /><p className='text-xl'>&nbsp; Review</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar