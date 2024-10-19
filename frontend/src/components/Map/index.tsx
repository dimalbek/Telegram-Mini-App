import { useGlobalContext } from "@/context/GlobalContext";
import { TModule } from "@/lib/types";
import { useEffect, useState } from "react";
import { Module } from "./Module";


export const Map = () => {
    const {course, user} = useGlobalContext();
    const [modules, setModules] = useState<TModule[]>([]);

    useEffect(() => {
        if (course && user) {
            fetch(`https://telegram-mini-app-x496.onrender.com/courses/${course?.course_id}/modules?user_id=${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                setModules(data)
            })
        }
    }, [course, user])

    return (
        <div className="w-full flex flex-col items-center gap-4">
            {
                modules && modules.map((module: TModule, id: number) => {
                    return <Module id={module.module_id} module={module} key={id} />
                }
            )
            }
        </div>
    )
}