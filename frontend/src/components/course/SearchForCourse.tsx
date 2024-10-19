import { TCourse } from "@/lib/types"
import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { TypographyH3, TypographyP } from "../ui/typography"
import CourseElement from "./CourseElement"
import { useGlobalContext } from "@/context/GlobalContext"

export const SearchForCourse = () => {
    const {user} = useGlobalContext()
    const [search, setSearch] = useState<string>('')
    const [courses, setCourses] = useState<TCourse[]>([])

    useEffect(() => {
        if (user) {
            fetch(`https://telegram-mini-app-x496.onrender.com/courses?user_id=${user?.id || '444368298'}`, 
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                )
                .then(response => response.json())
                .then(data => {
                    setCourses(data.objects)
                })
        }
        
    }, [])

    return (
        <div className="w-full flex flex-col items-center gap-4">
            <TypographyH3 className='text-[24px]'>Courses</TypographyH3>
            <Input type="text" placeholder="Search.." value={search} onChange={(e) => setSearch(e.target.value)} />
            
            {courses && courses.length ? courses.filter((course) => course.title.toLowerCase().includes(search.toLowerCase())).map(courseData=>{
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