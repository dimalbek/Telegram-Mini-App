
import { FC } from "react";
import { Button } from "../ui/button";
import { useGlobalContext } from "@/context/GlobalContext";
import { Map } from "../Map";

interface CourseInformationProps {
}

//@ts-ignore
const CourseInformation: FC<CourseInformationProps> = ({}) => {

  const {course, setCourse} = useGlobalContext();

  const handleEnroll = () => {
    if (course) {
      fetch(`https://telegram-mini-app-x496.onrender.com/courses/${course?.course_id}/enroll?user_id=444368298`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => response.json())
      .then(() => {
        setCourse({...course, is_enrolled: true});
      })
    }
    
  }

    if (!course) return null;
    return (
        <div className="flex w-full flex-col items-center gap-2 p-4">
          <h1 className="text-[24px]">{course.title}</h1>
          <p>{course.description}</p>
          {
            !course.is_enrolled ? <Button className="w-full" onClick={handleEnroll}>Enroll</Button> : <Map />
          }
        </div>
      );
}

export default CourseInformation