import Navbar from "@/components/Navbar";
import { Outlet, useLocation } from "react-router";

const MainLayout = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className='w-full h-full m-auto'>
      {path!="/" && <Navbar/>}
      <Outlet/>
    </div>
  )
}

export default MainLayout