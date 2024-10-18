
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import { Greeting } from '../pages/Greeting';

const MainLayout = () => {
  return (
    <div className='w-full  h-full m-auto'>
        <Greeting />
        <Outlet/>
    </div>
  )
}

export default MainLayout