import { TCourse } from "@/lib/types";
import { FC } from "react";

interface CourseInformationProps {
    course: TCourse | undefined;
}

//@ts-ignore
const CourseInformation: FC<CourseInformationProps> = ({course}) => {
    if (!course) return null;
    return (
        <div className="flex w-full flex-col items-center gap-2 p-4">
          <h1 className="text-[24px]">{course.title}</h1>
          <p>{course.description}</p>

        </div>
      );
}

export default CourseInformation