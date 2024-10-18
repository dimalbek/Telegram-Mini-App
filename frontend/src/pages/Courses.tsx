import { useState } from 'react';
import CourseElement from '../components/course/CourseElement';
import { TypographyH3 } from '@/components/ui/typography';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreateCourse } from '@/components/course/CreateCourse';

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  

const COURSESDATA = [
    {
        id: 1,
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit",
        title: "Next.js 14 & React - The Complete Guide"
    },
    {   
        id: 2,
        description: "Next.js",
        title: "Hello.js 14 & React - The Complete Guide"
    }
]

const Courses = () => {
    // @ts-ignore
    const [data, setData] = useState(COURSESDATA);
    const [query, setQuery] = useState('');


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
            
            {data && data.filter((course) => course.title.toLowerCase().includes(query.toLowerCase())).map(courseData=>{
                return <CourseElement course={courseData}/>
            })}
        </div>
    )
}

export default Courses