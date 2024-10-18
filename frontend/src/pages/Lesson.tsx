
import { useParams } from 'react-router';

const Lesson = () => {

    const params = useParams();
    // @ts-ignore
    const {courseId, moduleId, lessonId} = params;

    const lesson = {
        title: 'Understanding HTML & CSS',
        description:
          'Learn the basics of HTML & CSS to build the foundation for modern web development. Understand the structure of web pages and how to style them.',
        imageUrl: 'https://miro.medium.com/v2/resize:fit:792/1*lJ32Bl-lHWmNMUSiSq17gQ.png',
    };
    

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg h-[350px]">
          <div className="flex items-stretch justify-between h-full">
            <div className="w-full md:w-1/2 pr-6">
              <img
                src={lesson.imageUrl}
                alt={lesson.title}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            <div className="w-full h-full md:w-1/2 flex flex-col justify-center space-y-4 flex-1">
              <h1 className="text-3xl font-bold">{lesson.title}</h1>
              <p className="text-gray-700">{lesson.description}</p>
              <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
                Go to Quiz
              </button>
            </div>
          </div>
        </div>
    );
}

export default Lesson