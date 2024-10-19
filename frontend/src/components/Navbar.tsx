
import { useGlobalContext } from '@/context/GlobalContext';
import { useNavigate } from 'react-router';
import { Avatar } from '@radix-ui/react-avatar';

const Navbar = () => {
  const {user} = useGlobalContext();
  
  const navigate = useNavigate();

  if (!user) return null;
  return (
    <nav className="text-white p-3 border-b-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div onClick={()=>navigate('/')}>
          <p className="text-xl font-semibold">{`${user && user.first_name}`}</p></div>

        <div className="flex items-center space-x-4">
          <p className="text-xl font-bold">{user.tokens_balance}</p>
          <img src="https://cdn-icons-png.flaticon.com/128/10692/10692946.png" alt="" className='w-8 h-8'/>
          <img
              src={user?.photo_url || "https://vercel.com/api/www/avatar/kXwUVWYcKQiITwkzB8n8dJFC?s=64"}
              alt="Avatar"
              className="w-8 rounded-full h-8" onClick={()=>navigate(`users/${user.id}/profile`)}
            />
        </div>
      </div>
    </nav>
  )
}

export default Navbar