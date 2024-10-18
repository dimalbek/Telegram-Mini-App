import { TCourse } from "@/lib/types";
import { FC, useEffect, useState } from "react";
import { Button } from "../ui/button";

interface CourseInformationProps {
    course: TCourse | undefined;
}

//@ts-ignore
const CourseInformation: FC<CourseInformationProps> = ({course}) => {

  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
      fetch(`https://telegram-mini-app-x496.onrender.com/courses/${course?.course_id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => response.json())
      .then(data => {
          setIsEnrolled(data.is_enrolled)
      })
  }, [])

    if (!course) return null;
    return (
        <div className="flex w-full flex-col items-center gap-2 p-4">
          <h1 className="text-[24px]">{course.title}</h1>
          <p>{course.description}</p>
          {
            !isEnrolled &&<Button className="w-full">Enroll</Button>
          }
        </div>
      );
}

export default CourseInformation