
import { Star, StarHalf } from 'lucide-react';

const CourseElement = ({image, description, name, onClick}: {image: string, description: string, name: string, onClick: ()=>void}) => {
    return (
        <div onClick={onClick} className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 flex items-center hover:cursor-pointer">
          {/* Course Image */}
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img src={image} alt={description} className='w-full h-full object-cover'/>
          </div>
    
          {/* Course Info */}
          <div className="ml-4 flex-1">
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-sm text-gray-500">{description}</p>
    
            {/* Rating */}
            <div className="flex items-center mt-2">
              <span className="text-lg font-semibold text-yellow-500">4.7</span>
              <div className="flex ml-2 text-yellow-500">
                <Star />
                <Star />
                <Star />
                <Star />
                <StarHalf />
              </div>
              <p className="text-sm text-gray-500 ml-2">(19,787)</p>
            </div>
          </div>
        </div>
      );
}

export default CourseElement