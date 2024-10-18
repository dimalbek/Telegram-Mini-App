import { useState } from 'react';
import CourseElement from '../components/course/CourseElement';
import { useNavigate } from 'react-router';

const COURSESDATA = [
    {
        id: 1,
        image: "https://img-c.udemycdn.com/course/240x135/3873464_403c_3.jpg",
        description: "Next.js",
        name: "Next.js 14 & React - The Complete Guide"
    },
    {   
        id: 2,
        image: "https://img-c.udemycdn.com/course/240x135/3873464_403c_3.jpg",
        description: "Next.js",
        name: "Next.js 14 & React - The Complete Guide"
    }
]

const Courses = () => {
    // @ts-ignore
    const [data, setData] = useState(COURSESDATA);

    const navigate = useNavigate();



    return (
        <div className="grid grid-cols-3 gap-4 justify-items-center w-full">
            {data && data.map(courseData=>{
                console.log(courseData);
                return <CourseElement {...courseData} onClick={()=>navigate(`/courses/${courseData.id}`)}/>
            })}
        </div>
    )
}

export default Courses