import React, { useState } from 'react';
import Progress from '@/components/Progress';
import { CircleX, X } from 'lucide-react';
import Question from '@/components/Question';
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from 'react-router';

const QUIZDATA = {
    "quiz": [
      {
        "id": 1,
        "question_type": "text",
        "question": "What is the capital city of France?",
        "options": [
          "Berlin",
          "Madrid",
          "Paris",
          "Rome",
          "London"
        ],
        "correct_answer": "Paris"
      },
      {
        "id": 2,
        "question_type": "image_and_text",
        "question": "Identify the animal in the image and select its correct species name.",
        "image_url": "https://example.com/lion.jpg",
        "text": "The image shows a large feline animal known for its majestic mane.",
        "options": [
          "Tiger",
          "Leopard",
          "Cheetah",
          "Lion",
          "Jaguar"
        ],
        "correct_answer": "Lion"
      },
      {
        "id": 3,
        "question_type": "image",
        "question": "Which of the following images is a famous painting by Vincent van Gogh?",
        "image_url": "https://example.com/starry_night.jpg",
        "options": [
          "Mona Lisa",
          "Starry Night",
          "The Scream",
          "The Persistence of Memory",
          "Girl with a Pearl Earring"
        ],
        "correct_answer": "Starry Night"
      }
    ]
};
  
interface UserAnswer {
    questionId: number,
    selectedAnswer: string | undefined,
    isCorrect: boolean
}

const Quiz = () => {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Array<UserAnswer>>([]);
    const totalQuestions = QUIZDATA.quiz.length;
    const [currentAnswer, setCurrentAnswer] = useState<string | undefined>();
    const [isQuizFinished, setIsQuizFinished] = useState<boolean>();
    const currentQuestion = QUIZDATA.quiz[currentQuestionIndex];

    const progress = currentQuestionIndex / totalQuestions * 100;

    const navigate = useNavigate();
    const params = useParams();

    const {courseId, moduleId, lessonId} = params;

    function handleUserAnswer(){
        setCurrentAnswer("");

        setUserAnswers([
            ...userAnswers,
            {
              questionId: currentQuestion.id,
              selectedAnswer: currentAnswer,
              isCorrect: currentAnswer === currentQuestion.correct_answer,
            },
        ]);

        setTimeout(() => {
            if (currentQuestionIndex + 1 < totalQuestions) {
              setCurrentQuestionIndex(prev=>prev+1);
            } else {
              setIsQuizFinished(true);
            }
        }, 300);
    }

    if (isQuizFinished) {
        const correctAnswersCount = userAnswers.filter((ans) => ans.isCorrect).length;
        return (
          <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Quiz Completed!</h2>
            <p className="text-lg mb-4">
              You got {correctAnswersCount} out of {totalQuestions} correct.
            </p>
            {/* <Button
              variant="default"
              className="mt-4"
              onClick={() => {
                // Reset quiz
                setCurrentQuestionIndex(0);
                setUserAnswers([]);
                setIsQuizFinished(false);
              }}
            >
              Retake Quiz
            </Button> */}
          </div>
        );
    }

    function handleXClick(){
        navigate(`/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`);
    }

    return (
        <div className='p-8'>
            <div className='w-full flex justify-between items-center mb-8'>
                <X className=' scale-[1.4]' onClick={handleXClick}/>
                <Progress value={progress}/>
            </div>
            <div className='w-full mb-16'>
                {currentQuestion.question_type==="text" && <h3 className='text-3xl font-semibold'>{currentQuestion.question}</h3>}
                {currentQuestion.question_type==="image" && <img className='w-full min-h-64 object-cover'/>}
                {currentQuestion.question_type==="image_and_text" && (
                    <>
                        <h3 className='text-3xl font-semibold mb-4'>{currentQuestion.question}</h3>
                        <img className='w-full min-h-64 object-cover'/>
                    </>
                )}
            </div>
            <div className='w-full mb-16'>
                <div className='flex flex-col gap-4 justify-center items-center'>
                    {currentQuestion.options.map(option=>{
                        const currentStyles = `p-6 rounded-md w-[250px] text-lg`;
                        const variant = currentAnswer === option ? "default" : "outline";
                        return (
                            <Button onClick={()=>setCurrentAnswer(option)} variant={variant} className={currentStyles}>
                                {option}
                            </Button>
                        )
                    })}
                </div>
            </div>
            <Button className='w-full text-lg p-6' onClick={handleUserAnswer}>Go forward</Button>
        </div>
    )
}

export default Quiz