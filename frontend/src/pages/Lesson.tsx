import { useParams } from 'react-router';
import { Separator } from "@/components/ui/separator";

import { useEffect, useState } from 'react';
import { BASE_URL } from '@/api/api';

interface LessonContent {
  type: string,
  value: string
  caption: string
}

interface LessonData {
  lesson_id: number,
  module_id : number,
  title : string,
  description: string,
  position: number,
  content: LessonContent[],
  imageUrl: string
}
  


const Lesson = () => {

    const params = useParams();
    // @ts-ignore
    const {courseId, moduleId, lessonId} = params;
    // @ts-ignore
    const [isLoading, setIsLoading] = useState(false);
    // @ts-ignore
    const [error, setError] = useState('');
    const [data, setData] = useState({} as LessonData);


    useEffect(()=>{
      if (courseId && moduleId && lessonId){
        async function fetchLessonData(lessonId: string){
          setIsLoading(true);
          const url = `${BASE_URL}/lessons/${lessonId}`;
          const response = await fetch(url, {
              method: "GET",
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          if (response.ok){
            const data = await response.json();
            console.log(data);
            setIsLoading(false);
            setData(data);
          }else{
            setIsLoading(false);
            const text = await response.text();
            setError(text);
          }
          return data;
        }
        fetchLessonData(lessonId);
      }
    }, [courseId, moduleId, lessonId]);

    const content = data.content;
    console.log(data, content); 

    return (
      <>
        {data && <div>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
                {/*<BreadcrumbDemo />*/}
                <div className="flex flex-col items-stretch justify-between h-full">
                    <div className="w-full md:w-1/2 pr-6">
                    <img
                        src={data.imageUrl}
                        alt={data.title}
                        className="rounded-lg object-cover w-full h-full"
                    />
                    </div>
                    <div className="w-full h-full md:w-1/2 flex flex-col justify-center space-y-4 flex-1">
                        <h1 className="text-3xl font-bold">{data.title}</h1>
                        <p className="text-gray-700">{data.description}</p>
                    </div>
                </div>
                <Separator className="mt-8 h-1 rounded-3xl bg-blue-500" />
                <div className='mt-16'>
                    <h3 className='w-fit m-auto text-2xl font-semibold'>Введение</h3>
                </div>
                <div className='py-8 flex flex-col gap-4'>
                    {content && content.map((block, index) => {
                        switch (block.type) {
                            case 'text':
                                return <p key={index}>{block.value}</p>;
                            case 'image':
                                return (
                                    <div key={index}>
                                        <img src={block.value} alt={block.caption || 'Lesson Image'} className='rounded-lg'/>
                                        {block.caption && <p className='text-gray-300 text-xs'>{block.caption}</p>}
                                        <Separator className="my-4 h-1 rounded-3xl" />
                                    </div>
                                );
                            case 'code':
                                return (
                                    <pre key={index} className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                                    <code className="block whitespace-pre-wrap">
                                        {block.value}
                                    </code>
                                    </pre>
                                );
                            // case 'video':
                            //     return (
                            //         <div key={index}>
                            //             <video src={block.value} controls />
                            //             {block.caption && <p>{block.caption}</p>}
                            //         </div>
                            //     );
                            default:
                                return null;
                            }
                        }
                    )}
                </div>
                <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
                    Go to Quiz
                </button>
            </div>

        </div>}
      </>
    );
}

export default Lesson