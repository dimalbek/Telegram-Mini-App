import { fetchUserData } from '@/api/api';
import { TelegramUser } from '@/global';
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';

interface UserContextProps {
  user: TelegramUser | null;
  setUser: React.Dispatch<React.SetStateAction<TelegramUser | null>>;
  isLoading: boolean;
  courses: any;
  setCourses: any;
  userId: number;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [userId, setUserId] = useState(12341241);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [courses, setCourses] = useState(null);


  console.log(courses);

  useEffect(() => {

    fetch(`https://telegram-mini-app-x496.onrender.com/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({user_id: userId}),
        })
          .then((response) => response.json())
          .then((data) => {
            setUser(data);
    });
    if (window.Telegram?.WebApp) {
      const { WebApp } = window.Telegram;

      WebApp.ready();
      
      const userData = WebApp.initDataUnsafe.user;
      // if (userData) {
      //   fetch(`https://telegram-mini-app-x496.onrender.com/users`, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({user_id: userData.id}),
      //   })
      //     .then((response) => response.json())
      //     .then((data) => {
      //       setUser(data);
      //   });
      //   // setTimeout(()=>{
      //   //   setUser();
      //   // }, 500);
      // } else {
      //   console.warn('User data is undefined.');
      //   setUser(null);
      // }
    } else {
      console.warn('Not running inside Telegram.');
      setUser({
        id: 0,
        first_name: 'Developer',
        last_name: 'User',
        token_balance: 0,
      });
    }
    setIsLoading(false);
  }, []);


  function getUserData(){

  }

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, courses, setCourses, userId}}>
      {children}
    </UserContext.Provider>
  );
};

export const useGlobalContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
