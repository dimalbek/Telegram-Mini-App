import {createContext, useState, useMemo} from 'react';

export const GlobalContext = createContext({} as GlobalContextProps);

export interface User {
    id: number;
    name: string;
    first_name: string, 
    last_name: string
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
    enrollCourse?: (course: Course) => void;
    unenrollCourse?: (courseId: number) => void;
    setUser: any,
    fetchData: () => {},
    loading: boolean,
    error: any,
    userData: any
}

import { fetchUserData } from '@/api/api';

export const GlobalProvider = ({ children }: {children: any}) => {
    const [user, setUser] = useState<User>({} as User);
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

