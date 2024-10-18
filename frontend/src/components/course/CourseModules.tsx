import React, {useState} from 'react';
import { Link } from 'react-router-dom';

interface Lesson {
  id: number;
  title: string;
  readingTime: string;
}

interface Module {
  id: number;
  moduleTitle: string;
  totalPosts: number;
  totalTime: string;
  lessons: Lesson[];
}

interface IsOpenState {
  [key: number]: boolean;
}

const MODULESDATA: Module[] = [
    { 
      "id": 1,
      "moduleTitle": "Getting Started",
      "totalPosts": 10,
      "totalTime": "22min",
      "lessons": [
        {
          "id": 971,
          "title": "Welcome to the Blog!",
          "readingTime": "3 min"
        },
        {
          "id": 972,
          "title": "Introduction to Web Development",
          "readingTime": "5 min"
        },
        {
          "id": 973,
          "title": "Understanding HTML & CSS",
          "readingTime": "4 min"
        }
      ]
    },
    {
      "id": 2,
      "moduleTitle": "Optional: React Refresher",
      "totalPosts": 5,
      "totalTime": "30min",
      "lessons": [
        {
          "id": 976,
          "title": "React Component Basics",
          "readingTime": "7 min"
        },
        {
          "id": 977,
          "title": "React State & Props",
          "readingTime": "6 min"
        }
      ]
    },
    {
      "id": 3,
      "moduleTitle": "NextJS Essentials (App Router)",
      "totalPosts": 3,
      "totalTime": "15min",
      "lessons": [
        {
          "id": 979,
          "title": "Introduction to Next.js",
          "readingTime": "5 min"
        },
        {
          "id": 980,
          "title": "Pages Router vs App Router in Next.js",
          "readingTime": "4 min"
        }
      ]
    }
]

const CourseModules = () => {

  const [isOpen, setIsOpen] = useState<IsOpenState>(
    MODULESDATA.reduce((acc, module, index) => {
      acc[module.id] = index===0 ? true : false;
      return acc;
    }, {} as IsOpenState)
  );
    
    const toggleSection = (section: any) => {
      setIsOpen((prev: any) => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            {MODULESDATA.map(moduleData=>{
                const totalTime = moduleData.lessons.reduce((acc, cur)=>acc+parseInt(cur.readingTime), 0);
                return (
                  <div>
                      <button
                          onClick={() => toggleSection(moduleData.id)}
                          className="w-full text-left p-4 bg-gray-200 hover:bg-gray-300"
                      >
                          <div className="flex justify-between items-center">
                            <h2 className="font-semibold text-lg">{moduleData.moduleTitle}</h2>
                            <span>{`${moduleData.lessons.length} posts • ${totalTime} min read`}</span>
                          </div>
                      </button>

                      {isOpen[moduleData.id] && (
                          <ul className="bg-white p-4">
                            {moduleData.lessons && moduleData.lessons.map(lesson=>{
                              return (
                                <li className="flex justify-between items-center py-2 border-b">
                                  <Link to={`modules/${moduleData.id}/lessons/${lesson.id}`} className="text-blue-600 hover:underline">
                                    {lesson.title}
                                  </Link>
                                  <span className="text-gray-500">{lesson.readingTime} read</span>
                                </li>
                              )
                            })}
                          </ul>
                      )}
                  </div>
                )
            })}
        </div>
    );
}

export default CourseModules