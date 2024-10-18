import { TCourse } from "@/lib/types"
import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { TypographyH3, TypographyP } from "../ui/typography"
import CourseElement from "./CourseElement"

export const SearchForCourse = () => {

    const [search, setSearch] = useState<string>('')
    const [courses, setCourses] = useState<TCourse[]>([])

    useEffect(() => {
        fetch('https://5939-178-91-253-84.ngrok-free.app/courses')
        .then(response => response.json())
        .then(data => {
            setCourses(data)
        })
    }, [])

    return (
        <div className="w-full flex flex-col items-center gap-4">
            <TypographyH3 className='text-[24px]'>Courses</TypographyH3>
            <Input type="text" placeholder="Search.." value={search} onChange={(e) => setSearch(e.target.value)} />
            
            {courses.length ? courses.filter((course) => course.title.toLowerCase().includes(search.toLowerCase())).map(courseData=>{
                return <CourseElement course={courseData}/>
            })
            :
            <div className="w-full flex items-center justify-start">
                <TypographyP>No courses found</TypographyP>
            </div>
        
        }
        </div>
    )
}