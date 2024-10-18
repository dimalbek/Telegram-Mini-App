
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className='w-full h-[150px] py-6 hover:cursor-pointer'>
        <div className='w-1/3 m-auto flex justify-between'>
            <Link className='bg-gray-300 rounded-md p-6' to='/courses'>
                Courses
            </Link>
            <Link className='bg-gray-300 rounded-md p-6' to='/progress'>
                Progress
            </Link>
        </div>
    </div>
  )
}

export default Navbar