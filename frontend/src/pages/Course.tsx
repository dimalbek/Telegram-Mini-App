
import { useParams } from 'react-router-dom';
import CourseInformation from '../components/course/CourseInformation';
import { TCourse } from '../lib/types';
import { useEffect, useState } from 'react';

const Course = () => {
    const params = useParams();

    const {courseId} = params;

    const [course, setCourse] = useState<TCourse | null>(null);

    useEffect(() => {
        fetch(`https://telegram-mini-app-x496.onrender.com/courses/${courseId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setCourse(data)
        })
    }, [])

    if (!course) return null;
    return (   
        <>
            <CourseInformation course={course}/>
        </>
    )
}

export default Course