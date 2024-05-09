import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Sidebar_codex from "../components/Sidebar_codex";


function Layout() {
  return (
    <>
    <div className='flex w-[100%] bg-slate-800'>
      <div className="w-[15vw]">
        {window.location.pathname.startsWith('/dataset') ||
        window.location.pathname.startsWith('/model') ||
        window.location.pathname.startsWith('/traintest') ||
        window.location.pathname.startsWith('/visualization') ||
        window.location.pathname.startsWith('/kernel') ? <Sidebar/> : <Sidebar_codex/>
        }
      </div>
      <div className="w-[85vw] min-h-[100vh]">
        <Outlet/>
      </div> 
    </div>
    </>   
   
  )
}


export default Layout