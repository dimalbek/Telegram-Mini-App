import {createContext, useState, useMemo} from 'react';

export const GlobalContext = createContext({});

export interface User {
    id: number;
    name: string;
}
  
export interface Course {
    id: number;
    title: string;
}

export interface GlobalState {
    user: User | null;
    courses: Course[];
    notifications?: Notification[];
}

export interface GlobalContextProps extends GlobalState {
    courses: Course[];
    login: (userData: User) => void;
    logout: () => void;
    enrollCourse?: (course: Course) => void;
    unenrollCourse?: (courseId: number) => void;
    setUser: any
}

import { fetchUserData } from '@/api/api';

export const GlobalProvider = ({ children }: {children: any}) => {
    const [user, setUser] = useState({
      id: 1341234,
      first_name: "Alikhan",
      last_name: "Nashtay"
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState();

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchUserData(user.id);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setUserData(result);
      } catch (err:any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    
    // @ts-ignore
    const [courses, setCourses] = useState([]);
// @ts-ignore
    const contextValue = useMemo(
      () => ({
        user,
        courses,
      }),
      [user, courses]
    );

  
    return (
      <GlobalContext.Provider value={{user, courses, setUser, userData, loading, error, fetchData}}>
        {children}
      </GlobalContext.Provider>
    );
};

export default GlobalProvider;

