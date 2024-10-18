import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className='w-full h-full m-auto'>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default MainLayout