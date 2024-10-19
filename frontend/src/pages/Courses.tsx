import { useEffect, useState } from 'react';
import CourseElement from '../components/course/CourseElement';
import { TypographyH3 } from '@/components/ui/typography';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreateCourse } from '@/components/course/CreateCourse';

import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { TCourse } from '@/lib/types';

import { useGlobalContext } from '@/context/GlobalContext';
const Courses = () => {
    // @ts-ignore
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');

    const {user} = useGlobalContext();

    const [courses, setCourses] = useState<TCourse[]>([]);

    useEffect(() => {
        if (user && user.id){
            fetch(`https://telegram-mini-app-x496.onrender.com/users/enrolled-courses?user_id=${user.id}`, 
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => response.json())
            .then(data => {
                setCourses(data);
            })
        }
    }, [user])


    return (
        <div className="flex flex-col items gap-4 items-center w-full gap-2 p-4">
            <Input type="text" placeholder="Search.." value={query} onChange={(e) => setQuery(e.target.value)} />
            <div className='w-full flex items-center justify-between '>
                <TypographyH3 className='text-[24px]'>My courses</TypographyH3>
                <Drawer>
                    <DrawerTrigger>
                        <Button size="default" variant="ghost">
                            <Plus size={24} />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent><CreateCourse /></DrawerContent>
                </Drawer>
                
            </div>
            <div className="w-full flex flex-col items-center gap-4">
                {courses && courses.filter((course: TCourse) => course.title.toLowerCase().includes(query.toLowerCase())).map(courseData=>{
                    return <CourseElement course={courseData}/>
                })}
            </div>
            
        </div>
    )
}

export default Courses