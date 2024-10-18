import React from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { COURSESDATA } from '../assets/courses';
import CourseInformation from '../components/course/CourseInformation';
import CourseModules from '../components/course/CourseModules';

const Course = () => {
    const params = useParams();

    const {courseId} = params;
    console.log(courseId)
    const courseData = COURSESDATA.find(courseData=>courseData.id.toString()===courseId);

    const {id, title, instructor, description, rating, imageUrl, lessons} = courseData;

    return (   
        <>
            <CourseInformation {...courseData}/>
            <CourseModules/>
        </>
    )
}

export default Course