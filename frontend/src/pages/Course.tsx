
import { useParams } from 'react-router-dom';
import CourseInformation from '../components/course/CourseInformation';
import { useEffect } from 'react';
import { useGlobalContext } from '@/context/GlobalContext';

const Course = () => {
    const params = useParams();

    const {courseId} = params;
    const {setCourse, user} = useGlobalContext();

    useEffect(() => {
        if (user) {
            fetch(`https://telegram-mini-app-x496.onrender.com/courses/${courseId}/?user_id=${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                setCourse(data);
            })
        }
        
    }, [user])

    return (   
        <>
            <CourseInformation/>
        </>
    )
}

export default Course