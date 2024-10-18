
//@ts-ignore
const CourseInformation = ({title, instructor, description, rating, numReviews, duration, imageUrl,lessons, ...other}) => {
    return (
        <div className="flex h-[80%] flex-col md:flex-row items-center justify-center bg-white p-6 space-y-6 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/2 flex justify-center overflow-hidden">
            <img
              src={imageUrl}
              alt={description}
              className="w-full max-w-lg hover:scale-125 transition-all"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-2 space-y-4 p-8">
            <h2 className="text-3xl font-semibold">
              {title}
              {instructor}
            </h2>

            <div className="flex items-center space-x-2">
              <div className="text-red-500 text-2xl">{rating}/5</div>
              <span className="text-sm text-blue-500">{`(${numReviews})`}</span>
            </div>

            <div className="text-4xl font-extrabold text-gray-800">
               {`You passed ${lessons} out of 31`}
            </div>

            <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition">
              Continue 
            </button>

            <div className="text-sm text-gray-600 space-y-1">
                {description}
            </div>
          </div>
        </div>
      );
}

export default CourseInformation