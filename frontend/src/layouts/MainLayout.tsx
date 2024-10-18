import Navbar from "@/components/Navbar";
import { Outlet, useLocation } from "react-router";

const MainLayout = () => {
  const location = useLocation();
  const path = location.pathname;
  console.log(path)
  return (
    <div className='w-full h-full m-auto'>
      {path!="/" && <Navbar/>}
      <Outlet/>
    </div>
  )
}

export default MainLayout