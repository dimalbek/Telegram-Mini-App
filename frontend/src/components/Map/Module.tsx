import { TLesson, TModule } from "@/lib/types";
import { FC, useEffect, useState } from "react";
import { TypographyP } from "../ui/typography";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton"
import { useGlobalContext } from "@/context/GlobalContext";
import { Check } from "lucide-react";

interface Props {
    module: TModule;
    id: number;
}

export const Module: FC<Props> = ({ module, id }) => {
    const [lessons, setLessons] = useState<TLesson[]>([]);
    const [offsets, setOffsets] = useState<number[]>([]);
    const [color, setColor] = useState<string>('');
    const navigate = useNavigate()
    const params = useParams();
    const [loaded, setLoaded] = useState<boolean>(false);
    const {user} = useGlobalContext();

    // Function to generate a random color for the lesson button
    const randomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    useEffect(() => {
        if (user) {
            fetch(`https://telegram-mini-app-x496.onrender.com/modules/${module.module_id}/lessons?user_id=${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                setLessons(data);
                const inoffsets = new Array(data.length).fill(0);
                let prev = 0;
                // @ts-ignore 
                const offsets = inoffsets.map((off: number, index: number) => {
                    if (index === 0) return 0;
                    const direction = Math.random() > 0.5 ? 1 : -1;
                    prev += (direction * 25);
                    return prev
                });
                setOffsets(offsets);
            });
    
            setColor(randomColor());
        }
        
    }, [module, user]);

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true);
        },  1500);
    }, [])

    const handleStart = (id: number) => {
        navigate(`/courses/${params.courseId}/modules/${module.module_id}/lessons/${id}`);
    }
    if (!loaded) return <Skeleton className="w-full h-[200px] rounded-lg" />
    return (
        <div className="w-full flex flex-col items-center gap-4" id={`${id}`}>
            {/* Module Title */}
            <div className="w-full grid items-center" style={{
                gridTemplateColumns: '1fr max-content 1fr',
                gridColumnGap: '8px'
            }}>
                <div className="w-full h-full gap-2 flex items-center justify-center">
                    <hr className="w-full" />
                </div>
                
                <TypographyP className="w-full !m-0 font-semibold text-gray-400">{module.title}</TypographyP>
                
                <div className="w-full h-full gap-2 flex items-center justify-center">
                    <hr className="w-full" />
                </div>
            </div>

            {/* Lessons Map */}
            <div className="w-full flex flex-col items-center gap-0">
                {lessons.map((lesson: TLesson, index: number) => (
                    <div 
                        key={lesson.lesson_id} 
                        className="flex flex-col items-center mb-4"
                        style={{
                            transform: `translateX(${offsets[index]}px)`
                        }}
                    >
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <button 
                                    className={`w-[60px] h-[60px] rounded-full flex items-center justify-center transition-transform shadow-2xl ${lesson.have_passed ? 'border-1 border-green-500' : ''}`}
                                    style={{ backgroundColor: color, boxShadow: '4px 8px 7px rgba(0, 0, 0, 0.5), 0px 4px 8px rgba(0, 0, 0, 0.06)',
                                        transition: 'box-shadow 0.3s ease-in-out', }}
                                >
                                    {
                                        lesson.have_passed ? <Check /> : <p className="w-full text-white">
                                        {lesson.title[0]}
                                    </p>
                                    }
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <div className="w-full max-w-[300px] h-full flex flex-col items-center gap-2 p-4">
                                    <h1 className="text-[20px]">{lesson.title}</h1>
                                    <p>{lesson.description}</p>
                                    <Button onClick={() => handleStart(lesson.lesson_id)} className={`w-full ${lesson.have_passed ? "bg-gray-400" : ''}`}>{lesson.have_passed ? 'Repeat' : 'Start'}</Button>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ))}
            </div>
        </div>
    );
};
