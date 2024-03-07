import React, { useState, useEffect } from 'react';
import './Quiz.css';
import { FaClock } from 'react-icons/fa';
import ThankYouPage from './ThankYouPage';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { renderExamQuestionData, renderExamStudentById, submitExamData, renderExamPracticeQuestionData } from 'src/utility/api';
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import ThankYouExamPage from './ThankYouPageExam';


const Quiz = () => {
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState(Array(4).fill(null));
    const [showResult, setShowResult] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [isCompleted, setIsCompleted] = useState();
    const [title, setTitle] = useState("Exam");


    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    });
    const [timer, setTimer] = useState(1800); // 1 hour in seconds
    const [questions, setQuestions] = useState([]);

    const { id, id1 } = useParams();
    const userId = Cookies.get('adminId');
    const orgId = Cookies.get('organizationId');
    const levelId = Cookies.get('levelId');



    useEffect(() => {
        //check exam type
        const examType = Cookies.get("examType")
        if (examType == "e") {
            setTitle("Final Exam")
        } else {
            setTitle("Practice Exam")
        }

        checkExamStatus();
        setActiveQuestion(0); // Reset activeQuestion to 0 when questions are loaded
        renderQuestion(examType);
    }, []);

    useEffect(() => {
        if (isCompleted) {
            setShowResult(true);
        }
    }, [isCompleted]);



    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer === 0) {
                    setIsTimerRunning(false);
                    clearInterval(interval);

                    toast.error("Time is over, Exam is submitted successfully, Thank you.", {
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });

                    submitFunction()


                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // /renderQuestion
    const renderQuestion = async (examType) => {
        if (examType == "e") {
            const response = await renderExamQuestionData(id1);
            if (response.success) {
                console.log("response", response)
                const timerCount = response.data[0]?.exam_id?.exam_duration

                // setTimer(30)
                if (timerCount == "30M") {
                    setTimer(1800);
                }
                else if (timerCount == "1H") {
                    setTimer(3600);
                } else if (timerCount == "1.5H") {
                    setTimer(5400);
                }
                else if (timerCount == "2H") {
                    setTimer(7200);
                } else if (timerCount == "2.5H") {
                    setTimer(9000);
                }
                else if (timerCount == "3H") {
                    setTimer(10800);
                } else if (timerCount == "3.5H") {
                    setTimer(12600);
                }
                else if (timerCount == "4H") {
                    setTimer(14400);
                }

                const updatedQuestions = response.data.map((question) => {
                    const correctAnswer = question.question_id.options.find((option) => option.is_true);
                    return {
                        ...question,
                        correctAnswer: correctAnswer.name,
                    };
                });
                setQuestions(updatedQuestions);
            }
        } else {
            const response = await renderExamPracticeQuestionData(id1);
            if (response.success) {
                console.log("response", response)
                const timerCount = response.data[0]?.exam_id?.exam_duration

                // setTimer(30)
                if (timerCount == "30M") {
                    setTimer(1800);
                }
                else if (timerCount == "1H") {
                    setTimer(3600);
                } else if (timerCount == "1.5H") {
                    setTimer(5400);
                }
                else if (timerCount == "2H") {
                    setTimer(7200);
                } else if (timerCount == "2.5H") {
                    setTimer(9000);
                }
                else if (timerCount == "3H") {
                    setTimer(10800);
                } else if (timerCount == "3.5H") {
                    setTimer(12600);
                }
                else if (timerCount == "4H") {
                    setTimer(14400);
                }

                const updatedQuestions = response.data.map((question) => {
                    const correctAnswer = question.question_id.options.find((option) => option.is_true);
                    return {
                        ...question,
                        correctAnswer: correctAnswer?.name,
                    };
                });
                setQuestions(updatedQuestions);
            }
        }
    }

    //checkExamStatus
    const checkExamStatus = async () => {
        const response = await renderExamStudentById(id);
        if (response.success) {
            setIsCompleted(response.data[0]?.is_completed)
        }
    }

    //submitExamAnswer
    const submitExamAnswer = async (obj) => {
        const response = await submitExamData(obj);
        if (response.success) {
            // console.log(response)
        } else {
            // console.log(response)
        }
    }

    const onClickNext = async () => {
        const updatedSelectedAnswers = [...selectedAnswers];
        updatedSelectedAnswers[activeQuestion] = selectedAnswers[activeQuestion];
        setSelectedAnswers(updatedSelectedAnswers);


        // Calculate the result
        const correctAnswers = questions.reduce((acc, q, i) => {
            return acc + (q.correctAnswer === selectedAnswers[i] ? 1 : 0);
        }, 0);

        const totalScore = correctAnswers * 1; // Assuming perQuestionScore is always 1

        setResult({
            score: totalScore,
            correctAnswers: correctAnswers,
            wrongAnswers: questions.length - correctAnswers,
        });

        if (activeQuestion !== questions.length - 1) {
            setActiveQuestion((prev) => prev + 1);
        } else {
            const confirmDelete = await Swal.fire({
                title: "Are you sure to finish the exam?",
                text: "You will not be able to recover this exam!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: '#28a745',
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, finish it!",
            });

            if (confirmDelete.isConfirmed) {

                let type = Cookies.get("examType")
                if (type == "e") {
                    submitFunction()
                }else{
                    setActiveQuestion(0);
                    setShowResult(true);
                }



            }
        }
    };

    const submitFunction = async () => {
        // console.log("result",result)
        const examSubmissionData = questions.map((q, i) => {
            const selectedOption = selectedAnswers[i];
            const isQuestionAnswerRight = q.correctAnswer == selectedOption;

            return {
                question_id: q.question_id._id,
                options: q.question_id.options.map((opt) => ({
                    name: opt.name,
                    is_answer: opt.name === selectedOption,
                    is_true: opt.is_true
                })),
                is_question_answer_right: isQuestionAnswerRight,
                exam_id: id1,
                examination_id: id,
                student_id: userId,
                organization_id: orgId,
                level_id: levelId,

            };
        });

        await submitExamAnswer(examSubmissionData);
        setActiveQuestion(0);
        setShowResult(true);
    }


    const onClickPrevious = () => {
        if (activeQuestion !== 0) {
            setActiveQuestion((prev) => prev - 1);
        }
    };

    const onAnswerSelected = (answer, index) => {
        const updatedSelectedAnswers = [...selectedAnswers];
        updatedSelectedAnswers[activeQuestion] = answer;
        setSelectedAnswers(updatedSelectedAnswers);
    };

    const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

    const secondsToTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(remainingSeconds)}`;
    };

    return (
        <div className="quiz-wrapper">

            {questions.length > 0 && (
                !showResult ? (
                    <>
                        <div className="quiz-container">
                            <h2 className='text-center mb-3'>{title}</h2>
                            <p className="instruction">Please Do Not Refresh The Page Until You Finish The Exam, Otherwise You Will Not Be Able To Submit.</p>

                            {isTimerRunning ? (
                                <>
                                    <div className="timer">
                                        <FaClock className="timer-show-icon" />
                                        <span className="timer-show">{secondsToTime(timer)}</span>
                                    </div>
                                    <hr />
                                </>
                            ) : null}
                            <div>
                                <div>
                                    <span className="active-question-no">{addLeadingZero(activeQuestion + 1)}</span>
                                    <span className="total-question">/{addLeadingZero(questions.length)}</span>
                                </div>
                                <h2>{questions[activeQuestion].question_id.question}</h2>
                                <ul>
                                    {questions[activeQuestion].question_id.options.map((option) => (
                                        <li
                                            key={option.name}
                                            onClick={() => onAnswerSelected(option.name, activeQuestion)}
                                            className={
                                                selectedAnswers[activeQuestion] === option.name ? 'selected-answer' : null
                                            }
                                        >
                                            {option.name}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex-right">
                                    <button className='mx-2' onClick={onClickPrevious} disabled={activeQuestion === 0}>
                                        Previous
                                    </button>
                                    <button onClick={onClickNext} disabled={selectedAnswers[activeQuestion] === null}>
                                        {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <ThankYouExamPage result={result} questions={questions} id={id} isCompleted={isCompleted} examType={Cookies.get("examType")}></ThankYouExamPage>
                )
            )}
        </div>
    );


};

export default Quiz;
