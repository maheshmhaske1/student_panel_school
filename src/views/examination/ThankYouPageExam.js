import React, { useEffect, useState } from 'react';
import "./Thnaks.css"
import { FaDownload } from 'react-icons/fa';
import { updateStudentData ,renderExamStudentById} from 'src/utility/api';
import CertificateGenerator from './CertificateGenerator';
import Cookies from 'js-cookie';


const ThankYouExamPage = ({ result, questions, id, isCompleted }) => {

    const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false)
    const [examDataForPrint, setExamDataForPrint] = useState({});
    const [examType, setExamType] = useState(Cookies.get("examType"))

    console.log("examType", examType)
    useEffect(() => {

        if (!isCompleted && examType == "e") {
            addMarks()
        }
        renderData()

    }, []);

    const downloadCertificate = () => {
        setIsCertificateModalOpen(true)
    }

    const addMarks = async () => {
        const obj = {
            total_questions: questions.length,
            wrong_questions: result.wrongAnswers,
            exam_score: result.score,
            correct_questions: result.correctAnswers,
            exam_student_id: id
        }

        const response = await updateStudentData(obj)
        if (response.success) {
            console.log("updateStudentData", response)
        }
    }
    const renderData = async ()=>{
        

        const response = await renderExamStudentById(id)
        if (response.success) {
            setExamDataForPrint(response.data[0])
            console.log("response.data[0]", response.data[0])
        }
    }
    return (
        <>
            <div className="content">
                <div className="wrapper-1">
                    <div className="wrapper-2">
                        <h1>Thank you !</h1>
                        <p>Your exam has been submitted successfully.</p>
                        <hr></hr>
                        <h1>Result</h1>
                        <p className='text-result'>
                            <b>Total Question</b>  &nbsp; &nbsp; &nbsp;  <span>: {questions.length}</span>
                        </p>
                        <p className='text-result'>
                            <b>Total Score</b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span>: {result.score}</span>
                        </p>
                        <p className='text-result'>
                            <b>Correct Answers</b>&nbsp;&nbsp;&nbsp;<span className='margin_2'>:  {result.correctAnswers}</span>
                        </p>
                        <p className='text-result'>
                            <b>Wrong Answers</b>  &nbsp; &nbsp; <span>: {result.wrongAnswers}</span>
                        </p>
                        {examType == "e" ? <> <hr></hr>
                        <button className="go-home" onClick={downloadCertificate}><FaDownload></FaDownload> Download Certificate</button></> : ''}
                       
                    </div>
                    <div className="footer-like">
                        <p>Thanks for visiting. <a href="/examination">Click here to go back</a></p>
                    </div>
                </div>
            </div>
            {isCertificateModalOpen ? <CertificateGenerator data={examDataForPrint} setIsCertificateModalOpen={setIsCertificateModalOpen} /> : ''}</>
    );
};

export default ThankYouExamPage;
