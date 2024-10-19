import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Courses from './pages/Courses';
import Course from './pages/Course';
import Lesson from './pages/Lesson';
import { Generate } from './components/course/Generate';
import {Greeting} from './pages/Greeting'
import Quiz from './pages/Quiz';
import MainLayout from './layouts/MainLayout';
import Profile from './pages/Profile';

const router = createBrowserRouter([
  {
    path: "", 
    element: <MainLayout/>,
    children: [
      {
        path: '',
        element: <Greeting />,
      },
      {
        path: '/generate',
        element: <Generate />,
      },
      {
        path: "courses", 
        children: [
          {
            path: "",
            element: <Courses />,
          },
          {
            path: ":courseId",  
            element: <Course />,
          },
          {
            path: ":courseId/modules/:moduleId/lessons/:lessonId",
            element: <Lesson/>
          },
          {
            path: ":courseId/modules/:moduleId/lessons/:lessonId/quiz",
            element: <Quiz/>
          }
        ],
      },
      {
        path: "progress",  
        //element: <Progress />,
      },
      {
        path: "users/:userId/profile",
        element: <Profile/>
      }
    ],
  },
]);


function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App;
