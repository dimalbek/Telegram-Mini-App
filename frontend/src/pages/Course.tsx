
import { useParams } from 'react-router-dom';
import CourseInformation from '../components/course/CourseInformation';
import { useEffect } from 'react';
import { useGlobalContext } from '@/context/GlobalContext';

const Course = () => {
    const params = useParams();

    const {courseId} = params;
    const {setCourse} = useGlobalContext();

    useEffect(() => {
        fetch(`https://telegram-mini-app-x496.onrender.com/courses/${courseId}/?user_id=444368298`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setCourse(data);
        })
    }, [])

    return (   
        <>
            <CourseInformation/>
        </>
    )
}

export default Course