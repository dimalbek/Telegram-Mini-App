
import { TCourse } from '@/lib/types';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  course: TCourse;
}

const CourseElement: FC<Props> = ({course}) => {
  if (!course) return
    return (
        <Link to={`/courses/${course.course_id}`} className="w-full bg-white rounded-lg shadow-md p-6 flex items-center hover:cursor-pointer">
          
          <div className="ml-4 flex-1">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-sm text-gray-500">{course.description}</p>
          </div>
        </Link>
      );
}

export default CourseElement