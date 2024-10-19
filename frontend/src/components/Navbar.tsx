
import { useGlobalContext } from '@/context/GlobalContext';

const Navbar = () => {
  const {user} = useGlobalContext()

  if (!user) return null;
  return (
    <nav className="bg-gray-800 text-white p-3 border-b-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold">{`${user && user.first_name}`}</div>

        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold">{user.token_balance}</span>
          <img src="https://cdn-icons-png.flaticon.com/128/10692/10692946.png" alt="" className='w-8 h-8'/>
        </div>
      </div>
    </nav>
  )
}

export default Navbar