import React, { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CFormFeedback,
    CFormLabel,
    CFormSelect,
} from "@coreui/react";
import DataTable from "../ownComponent/DataTable";
import FormsCustom from "../ownComponent/FormsCustom";
import {
    renderOrganizationData,
    renderTeacherData,
    addExam,
    editExam,
    deleteExamData,
    renderExamData,
    renderLevelData,
    renderTeacherByOrganization,
    renderExamDataByOrganization,
    renderExamByStudentId
} from "src/utility/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import Select from "react-select";
import Cookies from 'js-cookie'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom'
import ThankYouPage from "../examination/ThankYouPage";


function RecentExam() {
    const orgId = Cookies.get("organizationId");
    const studentId = Cookies.get("adminId");

    const [data, setData] = useState([]);
    const [examId, setExamId] = useState([]);
    const [isResult, setIsResult] = useState(false)
    
    const navigate = useNavigate()
    useEffect(() => {
        renderData();
    }, []);

    // render data
    const renderData = async () => {
        const obj = {
            "student_id": studentId,
            "type": "recent"
        }
        const response = await renderExamByStudentId(obj);
        if (response.success) {
            setData(response.data);
        }
    };

    // handleExamView
    const handleExamView = async (data) => {
        let id = data._id
        setExamId(id)
        setIsResult(true)
        Cookies.set("examType", "e", { secure: true, sameSite: 'strict' })
        
    }

    const columns = [
        { Header: "Exam Name", accessor: "exam_id.exam_name" },
        { Header: "Level Name", accessor: "exam_id.level_id.name" },
        { Header: "Incharge Teacher", accessor: "exam_id.teacher_id.name" },
        { Header: "Exam Duration", accessor: "exam_id.exam_duration" },
        { Header: "Total Marks", accessor: "exam_id.total_marks" },


        {
            Header: "Exam Start Date & Time",
            accessor: "exam_id.examDateTime",
            Cell: ({ value }) => {
                // Format the date
                const formattedDate = new Date(value).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                });

                // Format the time
                const formattedTime = new Date(value).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                });

                return `${formattedDate} ${formattedTime}`;
            },
        },
        {
            Header: "Exam End Date & Time",
            accessor: "exam_id.examEndDateTime",
            Cell: ({ value }) => {
                // Format the date
                const formattedDate = new Date(value).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                });

                // Format the time
                const formattedTime = new Date(value).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                });

                return `${formattedDate} ${formattedTime}`;
            },
        },
        {
            Header: "Exam Status",
            accessor: "is_completed",
            Cell: ({ value }) => (
                <CButton
                    color={value ? "success" : "danger"}
                    size="sm"
                    style={{ color: "white", borderRadius: "20px", minWidth: "110px" }} // Set a fixed width
                >
                    {value ? "Completed" : "Not Completed"}
                </CButton>
            ),
        },
        {
            Header: "Actions",
            accessor: "_id", // Assuming you have an 'id' property in your teacher data
            Cell: ({ row }) => {
                if (row.original.is_completed) {
                    return (
                        <CButton
                            color="success"
                            size="sm"
                            style={{ color: "white", width: "-webkit-fill-available", fontWeight: "bold" }}
                            onClick={() => handleExamView(row.original)}
                        >
                            <FaEye /> See Result
                        </CButton>
                    )
                } else {
                    return "-"
                }

            },
        },

        // {
        //     Header: "Actions",
        //     accessor: "_id", // Assuming you have an 'id' property in your teacher data
        //     Cell: ({ row }) => (

        //         <>

        //             <CButton
        //                 color="info"
        //                 size="sm"
        //                 style={{ color: "white" }}
        //                 onClick={() => handleEdit(row.original._id)}
        //             >
        //                 <FaEdit /> Start Practice Exam
        //             </CButton>{" "}



        //             <CButton
        //                 color="success"
        //                 size="sm"
        //                 style={{ color: "white" }}
        //                 onClick={() => handleExamView(row.original._id)}

        //             >
        //                 <FaEdit /> Start Final Exam
        //             </CButton>

        //         </>
        //     ),
        // },





    ];

    return (
        <>
           

            {isResult? <ThankYouPage examId={examId}></ThankYouPage>:<> <DataTable columns={columns} data={data} name="Exam List" /></>}
           

        </>
    );
}

export default RecentExam
