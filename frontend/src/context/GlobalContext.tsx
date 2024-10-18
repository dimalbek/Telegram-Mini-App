import {createContext, useState, useMemo} from 'react';

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export interface User {
    id: number;
    name: string;
}
  
export interface Course {
    id: number;
    title: string;
}

export interface Notification {
    id: number;
    message: string;
}

export interface GlobalState {
    user: User | null;
    courses: Course[];
    notifications?: Notification[];
}

export interface GlobalContextProps extends GlobalState {
    login: (userData: User) => void;
    logout: () => void;
    enrollCourse?: (course: Course) => void;
    unenrollCourse?: (courseId: number) => void;
    addNotification?: (notification: Notification) => void;
    removeNotification?: (notificationId: number) => void;
}


export const GlobalProvider = ({ children }: {children: any}) => {
    const [user, setUser] = useState<User | null>(null);
    // @ts-ignore
    const [courses, setCourses] = useState<Course[]>([]);
  
    const login = (userData: any) => {
      setUser(userData);
    };
  
    const logout = () => {
      setUser(null);
    };
// @ts-ignore
    const contextValue = useMemo(
      () => ({
        user,
        courses,
        login,
        logout,
      }),
      [user, courses]
    );
  
    return (
      <GlobalContext.Provider value={{user, courses, login, logout}}>
        {children}
      </GlobalContext.Provider>
    );
};

export default GlobalProvider;

