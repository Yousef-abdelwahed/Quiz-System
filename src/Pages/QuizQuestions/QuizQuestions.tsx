import { getAllQuestionsData } from '@/Redux/Featuers/Quizzes/quizQuestionsSlice';
import useCurrentUrl from '@/Utils/Hooks/useCurrentUrl';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { LoadingSpinner } from '@/Components';
import { TbFidgetSpinner } from 'react-icons/tb';
import { FaCheckCircle } from 'react-icons/fa';

export default function QuizQuestions() {
    const [loading, setLoading] = React.useState(null);
    const [quizQuestions, setQuizQuestions] = React.useState([]);
    const dispatch = useDispatch();
    const quizId = useCurrentUrl();
    const [answers, setAnswers] = React.useState<Submission[]>([]);
    const [quizName, setQuizName] = React.useState<string>("");
  const [correctAnswers, setCorrectAnswers] = React.useState<any>()
  const [score, setScore] = React.useState(0)
   const [finalGrade, setFinalGrade] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false);
    const { register } = useForm();
    React.useEffect(() => {
      getAllQuizQuesData();  
    }, []);
    const getAllQuizQuesData = React.useCallback(async () => {
      setLoading(true);
      try{
        const element = await dispatch(getAllQuestionsData(quizId));
        console.log(element?.payload?.data?.data?.questions);
        setQuizQuestions(element?.payload?.data?.data?.questions);
        setFinalGrade(element?.payload?.data?.data?.score_per_question * element?.payload?.data?.data?.questions_number)
        setQuizName(element?.payload?.data?.data?.title);
      }catch(error){
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, [dispatch]);

    const token = localStorage.getItem("UserToken");
    const submitAnswers = () => {
        console.log(answers);
        setIsLoading(true)
        axios
          .post(`https://upskilling-egypt.com:3005/api/quiz/submit/${quizId}`, { answers },{
            headers:{ Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setCorrectAnswers(response?.data?.data?.questions);
            setIsLoading(false)
            setScore(response?.data?.data?.score);
            console.log(response);
            toast.success(response?.data?.message);
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.response.data.message);
            setIsLoading(false)
          });
      };

      const handleSubmit = (questionId: string, selectedAnswer: string) => {
        const newSubmission= {
          question: questionId,
          answer: selectedAnswer,
        };
        const existingSubmissionIndex = answers.findIndex(
          (submission) => submission.question === questionId
        );
    
        if (existingSubmissionIndex !== -1) {
          setAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[existingSubmissionIndex] = newSubmission;
            return updatedAnswers;
          });
        } else {
          setAnswers((prevAnswers) => [...prevAnswers, newSubmission]);
        }
      };


  
  return (
    <>
 {correctAnswers?
 <>
 <div className="flex my-10 p-4 w-full justify-center">
    <div>
      <h3 className="font-semibold text-4xl bg-orange-100   px-3 py-1  mb-2 text-center">score : {`${score}/${finalGrade}`}</h3>
      {correctAnswers?.map((el:any,idx:number)=><div className="mt-3">
        <div className='flex items-center'>
        <p className='bg-orange-100 w-fit my-3 p-1 rounded-lg'>QuestionNo:{idx+1}</p>
  <span className="px-2 py-1 rounded-xl font-semibold border-l-2 border-y-2">{el.title} </span>
        </div>
  <div className='flex items-center'>
  <p className='bg-orange-400 p-1 rounded-lg mx-1'>CorrectAnswer:</p>
  <p className="bg-green-300   w-fit p-1 rounded-lg">{el.options[el.answer]}</p>
  </div>
 </div>)}

</div>
</div>
 </>
:
<>
       <div className="pt-3 mt-5 border rounded-xl">
        <div className="m-3 font-bold">QUIZ Name: {quizName || ""}</div>
        </div>
    {(
        quizQuestions.map((question,index)=>(
            <div key={index} className="m-3 bg-orange-100  p-2  shadow-md rounded-lg">
              
             <div key={index} className=" w-auto   rounded-md mt-1 py-1 px-2 "
               {...register("question")}
               >
                <span className='mx-2'>{index+1}-</span>
               {question?.title}
             </div>
             <div className="answers mx-3  ">
               <div className="subAnswer bg-white px-3   rounded-md shadow-md my-2">
                 <input
                   type="radio"
                   id={`${index}A`}
                   className="mr-3"
                   {...register("answer")}
                   name={`question_${question?._id}`}
                   onChange={() =>
                    handleSubmit(question?._id, "A")
                }
                 />
                 <label htmlFor={`${index}A`}>{question?.options?.A}</label >
               </div>
               <div className="subAnswer bg-white px-3  rounded-md shadow-md my-2">
                 <input
                   type="radio"
                   id={`${index}B`}
                   className="mr-3"
                   {...register("answer")}
                   name={`question_${question?._id}`}
                   onChange={() =>
                    handleSubmit(question?._id, "B")
                }
                 />
                 <label htmlFor={`${index}B`} >{question?.options.B}</label >
               </div>
               <div className="subAnswer bg-white px-3  rounded-md shadow-md my-2">
                 <input
                   type="radio"
                   id={`${index}C`}
                   className="mr-3"
                   {...register("answer")}
                   name={`question_${question?._id}`}
                   onChange={() =>
                     handleSubmit(question?._id, "C")
                   }
                   />
                 <label  htmlFor={`${index}C`} >{question?.options.C}</label >
               </div>
               <div className="subAnswer bg-white px-3  rounded-md shadow-md my-2">
                 <input
                   type="radio"
                   id={`${index}D`}
                   className="mr-3"
                   {...register("answer")}
                   name={`question_${question?._id}`}
                   onChange={() =>
                    handleSubmit(question?._id,"D")
                }
                />
                 <label htmlFor={`${index}D`}>{question?.options.D}</label>
               </div>
             </div>
           </div>
   )))
              }
<div className="text-center flex justify-center ">
           <button
                    type="submit"
                    onClick={submitAnswers}
                    className={
                      "bg-orange-100 flex items-center justify-center transition duration-100 hover:bg-gray-800  text-slate-950  hover:text-slate-50  rounded-lg p-5 py-2 mt-3 font-bold" +
                      (isLoading ? " disabled" : " ")
                    }
                  >
                    {isLoading == true ? (
                      <TbFidgetSpinner className="animate-spin" />
                    ) : (
                      <>
                        Submit
                        <span>
                          <FaCheckCircle className="mx-2 text-xl rounded-full" />
                        </span>
                      </>
                    )}
                  </button>
        </div>
                </>
    } 
 

    </>
  );
}
