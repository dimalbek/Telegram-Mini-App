
import { useParams } from 'react-router-dom';
import { COURSESDATA } from '../assets/courses';
import CourseInformation from '../components/course/CourseInformation';
import { TCourse } from '../lib/types';

const Course = () => {
    const params = useParams();

    const {courseId} = params;
    const courseData: TCourse | undefined = COURSESDATA.find(course => course.id === Number(courseId));

    return (   
        <>
            <CourseInformation course={courseData}/>
        </>
    )
}

export default Course