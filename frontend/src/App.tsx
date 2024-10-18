import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Courses from './pages/Courses';
import Course from './pages/Course';
import Lesson from './pages/Lesson';
import { Generate } from './pages/Generate';
import {Greeting} from './pages/Greeting'
import Quiz from './pages/Quiz';
import MainLayout from './layouts/MainLayout';

const router = createBrowserRouter([
  {
    path: "", 
    children: [
      {
        path: "",
        element: <MainLayout/>
      },
      {
        path: '/greeting',
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
    ],
  },
]);


function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App;
