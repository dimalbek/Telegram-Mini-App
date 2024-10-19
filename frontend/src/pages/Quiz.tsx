import { useState, useEffect } from 'react';
import Progress from '@/components/Progress';
// import { CircleX, X } from 'lucide-react';
import { X } from 'lucide-react';
// import Question from '@/components/Question';
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

export interface Question {
  question_id: number;
  quiz_id: number;
  question_text: string;
  question_type: "multiple_choice" | "true_false"; // Using specific string literals
  options: string[];
  correct_answer: string;
}

// Represents the quiz containing multiple questions
export interface QuizType {
  quiz_id: number;
  lesson_id: number;
  title: string;
  description: string;
  position: number;
  questions: Question[];
}

// Represents a user's answer to a question
export interface UserAnswer {
  questionId: number;
  selectedAnswer: string | undefined;
  isCorrect: boolean;
}

export interface QuizResult {
  quiz_id: string | undefined;
  user_id: number;
  lesson_id: string | undefined;
  correct_answers: number;
  total_questions: number;
}

import { BASE_URL } from '@/api/api';
import { useGlobalContext } from '@/context/GlobalContext';

const Quiz = () => {
  // State to hold the quiz data
  const [quizData, setQuizData] = useState<QuizType | null>(null);

  const {user} = useGlobalContext();

  // State to track the current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  // State to store user's answers
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  // State to track the current selected answer
  const [currentAnswer, setCurrentAnswer] = useState<string | undefined>(undefined);

  // State to determine if the quiz is finished
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);

  // Navigation and routing
  const navigate = useNavigate();
  const params = useParams<{ courseId: string; moduleId: string; lessonId: string }>();

  const { courseId, moduleId, lessonId } = params;

  const [submitted, setSubmitted] = useState(false);

  // Fetch or initialize quiz data
  useEffect(() => {
      const fetchQuizData = async () => {
        const url = `${BASE_URL}/lessons/${lessonId}/quiz`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        if (response.ok){
          console.log(response);
        }
        const data = await response.json();
        setQuizData(data);
      };
      fetchQuizData();
  }, []);

  useEffect(()=>{
    if (isQuizFinished && !submitted && user && quizData){
      const submitQuiz = async () => {
        const url = `${BASE_URL}/lessons/${lessonId}/quiz/submit?user_id=${user.id}&correct_answers=${userAnswers.filter((ans) => ans.isCorrect).length}&total_questions=${quizData.questions.length}`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
        if (response.ok){
          setSubmitted(true);
        }
      };
      submitQuiz();
    }
  }, [isQuizFinished])

  const handleUserAnswer = () => {
    if (!quizData) return;

    const currentQuestion: Question = quizData.questions[currentQuestionIndex];

    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        questionId: currentQuestion.question_id,
        selectedAnswer: currentAnswer,
        isCorrect: currentAnswer?.toLowerCase() === currentQuestion.correct_answer?.toLowerCase(),
      },
    ]);

    setCurrentAnswer(undefined); // Reset current answer

    // Move to the next question or finish the quiz
    setTimeout(() => {
      if (currentQuestionIndex + 1 < quizData.questions.length) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setIsQuizFinished(true);
      }
    }, 300);
  };

  // Handle navigation when user clicks the 'X' icon
  const handleXClick = () => {
    navigate(`/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`);
  };

  // Calculate total questions and progress
  const totalQuestions = quizData ? quizData.questions.length : 0;
  const progress = quizData
    ? (currentQuestionIndex / totalQuestions) * 100
    : 0;

  if (!quizData) {
    return <div>Loading...</div>; // Or a spinner/loading component
  }
  

  if (isQuizFinished && submitted) {
    const correctAnswersCount = userAnswers.filter((ans) => ans.isCorrect).length;
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Quiz Completed!</h2>
        <p className="text-lg mb-4">
          You got {correctAnswersCount} out of {totalQuestions} correct.
        </p>
        <Button
          variant="default"
          className="mt-4"
          onClick={() => {
            // Reset quiz
            setCurrentQuestionIndex(0);
            setUserAnswers([]);
            setIsQuizFinished(false);
          }}
          asChild
        >
          <Link to={`/courses/${courseId}`}>Return to Course</Link>
        </Button>
      </div>
    );
  }

  const currentQuestion: Question = quizData.questions[currentQuestionIndex];

  const booleanChoices = ["True", "False"];

  return (
    <div className="p-8">
      <div className="w-full flex justify-between items-center mb-8">
        <X className="scale-[1.4]" onClick={handleXClick} />
        <Progress value={progress} />
      </div>
      <div className="w-full mb-16">
        <h3 className="text-3xl font-semibold">{currentQuestion.question_text}</h3>
      </div>
      <div className="w-full mb-16">
        <div className="flex flex-col gap-4 justify-center items-center">
          {currentQuestion.question_type==="multiple_choice" && currentQuestion.options.map((option, index) => {
            const isSelected = currentAnswer === option;
            const currentStyles = `p-6 rounded-md w-full text-lg ${
              isSelected ? 'bg-blue-500 text-white' : 'border border-gray-300'
            }`;
            return (
              <Button
                key={index}
                onClick={() => setCurrentAnswer(option)}
                variant={isSelected ? "default" : "outline"}
                className={currentStyles}
              >
                {option}
              </Button>
            );
          })}
          {currentQuestion.question_type==="true_false" && booleanChoices.map((option) => {
            const isSelected = currentAnswer === option;
            const currentStyles = `p-6 rounded-md w-[250px] text-lg ${
              isSelected ? 'bg-blue-500 text-white' : 'border border-gray-300'
            }`;
            console.log(option)
            return (
              <Button
                key={option}
                onClick={() => setCurrentAnswer(option)}
                variant={isSelected ? "default" : "outline"}
                className={currentStyles}
              >
                {option}
              </Button>
            );
          })}
        </div>
      </div>
      <Button
        className="w-full text-lg p-6"
        onClick={handleUserAnswer}
        disabled={currentAnswer === undefined}
      >
        Go Forward
      </Button>
    </div>
  );
};

export default Quiz;
