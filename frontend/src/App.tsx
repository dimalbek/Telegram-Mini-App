
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Courses from './pages/Courses';
import Course from './pages/Course';
import Lesson from './pages/Lesson';
import Quiz from './pages/Quiz';

const router = createBrowserRouter([
  {
    path: "",
    children: [
      {
        path: "",
        element: <MainLayout/>
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
