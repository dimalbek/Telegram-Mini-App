
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Courses from './pages/Courses';
import Course from './pages/Course';
import Lesson from './pages/Lesson';
import { Generate } from './components/course/Generate';
import {Greeting} from './pages/Greeting'

const router = createBrowserRouter([
  {
    path: "", 
    children: [
      {
        path: '/',
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
