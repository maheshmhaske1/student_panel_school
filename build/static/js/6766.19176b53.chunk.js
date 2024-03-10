"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[6766],{56766:(e,a,t)=>{t.r(a),t.d(a,{default:()=>u});var i=t(65043),n=t(62774),r=t(93946),c=t(49277),l=(t(64237),t(16027)),s=(t(42145),t(92342),t(30064),t(92619),t(1880)),o=(t(31899),t(25015),t(73216)),m=t(70579);const u=function(e){const a=s.A.get("organizationId"),t=s.A.get("adminId"),[u,d]=(0,i.useState)([]),[_,x]=(0,i.useState)(null),[h,S]=(0,i.useState)("Add Examination"),[g,w]=(0,i.useState)(!1),[D,p]=(0,i.useState)(!1),[v,f]=(0,i.useState)(!1),[E,T]=(0,i.useState)([]),[y,k]=(0,i.useState)([]),[C,H]=(0,i.useState)([]),[b,A]=(0,i.useState)(!1),[j,z]=(0,i.useState)(!0),[L,I]=(0,i.useState)(!1),[N,Q]=(0,i.useState)(!0),B=(0,o.Zp)(),F=s.A.get("adminId"),[G,O]=(0,i.useState)({exam_name:"",total_marks:"",organization_id:a,level_id:"",created_by:F,organization_value:null,organization_id:a,level_value:null,level_id:null,examDateTime:null,examEndDateTime:null,teacher_value:null,teacher_id:null,exam_duration:null,duration_value:null});(0,i.useEffect)((()=>{U()}),[]);const U=async()=>{const e={student_id:t,type:"upcoming"},a=await(0,l.pn)(e);a.success&&d(a.data)},M=async(e,a)=>{"final"===a?s.A.set("examType","e",{secure:!0,sameSite:"strict"}):s.A.set("examType","t",{secure:!0,sameSite:"strict"});let t=e._id,i=e.exam_id._id;B("/exam/".concat(t,"/").concat(i))},P=[{Header:"Exam Name",accessor:"exam_id.exam_name"},{Header:"Level Name",accessor:"exam_id.level_id.name"},{Header:"Incharge Teacher",accessor:"exam_id.teacher_id.name"},{Header:"Exam Duration",accessor:"exam_id.exam_duration"},{Header:"Total Marks",accessor:"exam_id.total_marks"},{Header:"Exam Start Date & Time",accessor:"exam_id.examDateTime",Cell:e=>{let{value:a}=e;const t=new Date(a).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}),i=new Date(a).toLocaleTimeString("en-US",{hour:"numeric",minute:"numeric",hour12:!0});return"".concat(t," ").concat(i)}},{Header:"Exam End Date & Time",accessor:"exam_id.examEndDateTime",Cell:e=>{let{value:a}=e;const t=new Date(a).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}),i=new Date(a).toLocaleTimeString("en-US",{hour:"numeric",minute:"numeric",hour12:!0});return"".concat(t," ").concat(i)}},{Header:"Exam Status",accessor:"is_completed",Cell:e=>{let{value:a}=e;return(0,m.jsx)(r.Q_,{color:a?"success":"danger",size:"sm",style:{color:"white",borderRadius:"20px",minWidth:"110px"},children:a?"Completed":"Not Completed"})}},{Header:"Actions",accessor:"_id",Cell:e=>{let{row:a}=e;if(a.original.is_completed)return"-";{const{exam_id:{examDateTime:e,examEndDateTime:t}}=a.original,i=new Date;return i>=new Date(e)&&i<=new Date(t)?(0,m.jsxs)(r.Q_,{color:"success",size:"sm",style:{color:"white",width:"-webkit-fill-available"},onClick:()=>M(a.original,"final"),children:[(0,m.jsx)(n.uO9,{})," Start Final Exam"]}):i<new Date(e)?(0,m.jsxs)(r.Q_,{color:"info",size:"sm",style:{color:"white",width:"-webkit-fill-available"},onClick:()=>M(a.original,"practice"),children:[(0,m.jsx)(n.uO9,{})," Start Practice Exam"]}):null}}}];return(0,m.jsx)(m.Fragment,{children:(0,m.jsx)(c.A,{columns:P,data:u,name:"Exam List"})})}}}]);
//# sourceMappingURL=6766.19176b53.chunk.js.map