
import { useParams } from 'react-router-dom';
import { COURSESDATA } from '../assets/courses';
import CourseInformation from '../components/course/CourseInformation';
import CourseModules from '../components/course/CourseModules';

const Course = () => {
    const params = useParams();

    const {courseId} = params;
    const courseData = COURSESDATA.find(courseData=>courseData.id.toString()===courseId);

    return (   
        <>
            {/* @ts-ignore */}
            <CourseInformation {...courseData}/>
            <CourseModules/>
        </>
    )
}

export default Course