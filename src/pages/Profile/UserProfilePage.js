import React, { useEffect, useRef, useState } from 'react';
import Navbar from "components/Navbar/Index";
// import { useOutletContext } from 'react-router-dom';
import Tab from 'components/TabBar/Tab';
import DynamicFormSection from 'components/Form/DynamicFormSection';
import { faUser, faEye, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as yup from "yup";
import WrapedTable from 'components/Datatables/WrapedTable';
import Modal from 'components/Modal/Modal';
import ProfilePreview from './ProfilePreview';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
// import html2pdf from 'html2pdf.js'

const UserProfilePage = () => {
//   const [sidebarToggle] = useOutletContext();
  const pdfRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(1);
  const [ weLoading, setWeLoading] = useState(false)
  const [ prLoading, setPrLoading] = useState(false)
  const [ edLoading, setEdLoading] = useState(false)
  const [ achLoading, setAchLoading] = useState(false)
  const [basicInfoContent, setBasicInfoTableContent] = useState(null)
  const [weTableContent, setWeTableContent] = useState([])
  const [prTableContent, setPrTableContent] = useState([])
  const [edTableContent, setEdTableContent] = useState([])
  const [achTableContent, setAchTableContent] = useState([])
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const basicInfoFields = [
    {
        name: "name",
        type: "text",
        label: 'Full Name',
        icon: <FontAwesomeIcon icon={faUser} />,
        placeholder : 'Enter your full name',
        col: "md:w-1/2",
        validation: yup.string().required("full name is required"),
    },
    {
        name: "currentTitle",
        type: "text",
        label: 'Title',
        icon: <FontAwesomeIcon icon={faUser} />,
        placeholder : 'Enter your work title',
        col: "md:w-1/2",
        validation: yup.string().required("title is required"),
    },
    {
        name: "phoneNumber",
        type: "text",
        label: 'Phone Number',
        icon: <FontAwesomeIcon icon={faUser} />,
        placeholder : 'Enter your full name',
        col: "md:w-1/2",
        validation: yup.string().matches(phoneRegExp, 'Phone number is not valid').required("phone number is required"),
    },
    {
        name: "email",
        type: "text",
        label: 'Email',
        icon: <FontAwesomeIcon icon={faUser} />,
        placeholder : 'Enter your full name',
        col: "md:w-1/2",
        validation: yup.string().email("email is not valid").required("full name is required"),
    },
    {
        name: "websiteLink",
        type: "text",
        label: 'Website Link',
        icon: <FontAwesomeIcon icon={faUser} />,
        placeholder : 'Enter your website link',
        col: "md:w-1/2",
        validation: yup.string().url("link is not valid"),
    },
    {
        name: "linkedIn",
        type: "text",
        label: 'linkedIn Link',
        icon: <FontAwesomeIcon icon={faUser} />,
        placeholder : 'Enter your linkedIn profile link',
        col: "md:w-1/2",
        validation: yup.string().url("link is not valid"),
    },
    {
        name: "gitHubLink",
        type: "text",
        label: 'Github Link',
        icon: <FontAwesomeIcon icon={faUser} />,
        placeholder : 'Enter your github link',
        col: "md:w-1/2",
        validation: yup.string().url("link is not valid"),
    },
    {
        name: "codePenLink",
        type: "text",
        label: 'CodePen Link',
        icon: <FontAwesomeIcon icon={faUser} />,
        placeholder : 'Enter your codePen link',
        col: "md:w-1/2",
        validation: yup.string().url("link is not valid"),
    },
  ]
  const workExperienceFields = [
    {
        name: "title",
        key: "title",
        type: "text",
        label: 'Title',
        icon: <FontAwesomeIcon icon={faUser} />,
        placeholder : 'Enter your work title',
        col: "md:w-1/2",
        validation: yup.string().required("work title is required"),
    },
    {
        name: "companyName",
        key: "companyName",
        type: "text",
        label: 'Company Name',
        icon: <FontAwesomeIcon icon={faUser} />,
        placeholder : 'Enter company name',
        col: "md:w-1/2",
        validation: yup.string().required("company name is required"),
    },
    {
        name: "location",
        key: "location",
        type: "text",
        label: 'Location',
        icon: <FontAwesomeIcon icon={faUser} />,
        placeholder : 'Enter location',
        col: "md:w-1/2",
        validation: yup.string().required("location is required"),
    },
    {
        name: "certificateLink",
        key: "certificateLink",
        type: "text",
        label: 'Certificate Link',
        icon: <FontAwesomeIcon icon={faUser} />,
        placeholder : 'Enter your certificate link',
        col: "md:w-1/2",
        validation: yup.string().url("link is not valid"),
    },
    {
        name: "startDate",
        key: "startDate",
        type: "date",
        label: 'Start Date',
        icon: <FontAwesomeIcon icon={faUser} />,
        placeholder : 'Enter start date',
        col: "md:w-1/2",
        // validation: yup.date(),
    },
    {
        name: "endDate",
        key: "endDate",
        type: "date",
        label: 'End Date',
        icon: <FontAwesomeIcon icon={faUser} />,
        placeholder : 'Enter end date',
        col: "md:w-1/2",
        // validation: yup.date().min(yup.ref('startDate'),
        // "end date can't be before start date"),
    }
  ]
  const projectFields = [
    {
        name: "projectTitle",
        key: "projectTitle",
        type: "text",
        label: 'Title',
        icon: <FontAwesomeIcon icon={faUser} />,
        placeholder : 'Enter your project title',
        validation: yup.string().required("project title is required"),
    },
    {
        name: "overview",
        key: "overview",
        type: "text",
        label: 'Overview',
        icon: <FontAwesomeIcon icon={faUser} />,
        placeholder : 'project overview',
        // col: "md:w-1/2",
        validation: yup.string().required("overview is required"),
    },
    {
        name: "diployedLink",
        key: "diployedLink",
        type: "text",
        label: 'Diployed link',
        icon: <FontAwesomeIcon icon={faUser} />,
        placeholder : 'Enter Diployed link',
        col: "md:w-1/2",
        validation: yup.string().url("link is not valid"),
    },
    {
        name: "projectsGitHubLink",
        key: "projectsGitHubLink",
        type: "text",
        label: 'GitHub Link',
        icon: <FontAwesomeIcon icon={faUser} />,
        placeholder : 'Enter github link',
        col: "md:w-1/2",
        validation: yup.string().url("link is not valid"),
    },
    {
        name: "projectDescription",
        key: "projectDescription",
        type: "textarea",
        label: 'Project description',
        icon: <FontAwesomeIcon icon={faUser} />,
        placeholder : 'Enter project description',
    }
  ]
  const educationFields = [
    {
        name: "eduTitle",
        key: "eduTitle",
        type: "text",
        label: 'Title',
        icon: <FontAwesomeIcon icon={faUser} />,
        placeholder : 'Enter your education title',
        col: "md:w-1/2",
        validation: yup.string().required("education title is required"),
    },
    {
        name: "collegeOrSchool",
        key: "collegeOrSchool",
        type: "text",
        label: 'college/school',
        icon: <FontAwesomeIcon icon={faUser} />,
        placeholder : 'Enter college/school name',
        col: "md:w-1/2",
        validation: yup.string().required("company name is required"),
    },
    {
        name: "startDate",
        key: "startDate",
        type: "date",
        label: 'Start Date',
        icon: <FontAwesomeIcon icon={faUser} />,
        placeholder : 'Enter start date',
        col: "md:w-1/2",
        // validation: yup.date(),
    },
    {
        name: "endDate",
        key: "endDate",
        type: "date",
        label: 'End Date',
        icon: <FontAwesomeIcon icon={faUser} />,
        placeholder : 'Enter end date',
        col: "md:w-1/2",
        // validation: yup.date().min(yup.ref('startDate'),
        // "end date can't be before start date"),
    }
  ]
  const AchievementsFields = [
    {
        name: "achievementTitle",
        key: "achievementTitle",
        type: "text",
        label: 'Title',
        icon: <FontAwesomeIcon icon={faUser} />,
        placeholder : 'Enter your achievement title',
        validation: yup.string().required("achievement title is required"),
    },
    {
        name: "achievementDescription",
        key: "achievementDescription",
        type: "textarea",
        label: 'Achievement description',
        icon: <FontAwesomeIcon icon={faUser} />,
        placeholder : 'Enter achievement description',
    }
  ]

  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
  })
  function onSubmitSuccessBasicInfo(data){
    setBasicInfoTableContent(data)
  }
  function onSubmitSuccessWorkExperience(data){
    const tempArr = weTableContent.map((ele)=>ele)
    tempArr.push(data)
    setWeTableContent(tempArr)
  }
  function onSubmitSuccessProjects(data){
    const tempArr = prTableContent.map((ele)=>ele)
    tempArr.push(data)
    setPrTableContent(tempArr)
  }
  function onSubmitSuccessEducations(data){
    const tempArr = edTableContent.map((ele)=>ele)
    tempArr.push(data)
    setEdTableContent(tempArr)
  }
  function onSubmitSuccessAchievements(data){
    const tempArr = achTableContent.map((ele)=>ele)
    tempArr.push(data)
    setAchTableContent(tempArr)
  }
  function handleSubmitBasicInfo(method, data){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve();
        },2000);
    })
  }
  function handleSubmitWorkExperience(method, data){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve();
        },2000);
    })
  }
  function handleSubmitProjects(method, data){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve();
        },2000);
    })
  }
  function handleSubmitEducations(method, data){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve();
        },2000);
    })
  }
  function handleSubmitAchievement(method, data){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve();
        },2000);
    })
  }
  function handlePreview(){
    setIsModalOpen(true)
  }
  const tabs = [
    {
        id: 1,
        label: 'Basic Info',
        content: <DynamicFormSection 
                    formFields={basicInfoFields}
                    handleSubmitForm={handleSubmitBasicInfo}
                    onSubmitSuccess={onSubmitSuccessBasicInfo}
                    selectedRowData={basicInfoContent}
                />,
    },
    {
        id: 2,
        label: 'Work Experience',
        content: <WrapedTable 
                    dataHeader={workExperienceFields} 
                    handleSubmitForm={handleSubmitWorkExperience} 
                    loading={weLoading} 
                    setLoading={setWeLoading} 
                    onSubmitSuccess={onSubmitSuccessWorkExperience} 
                    data={weTableContent}
                />,
    },
    {
        id: 4,
        label: 'Projects',
        content: <WrapedTable 
                    dataHeader={projectFields} 
                    handleSubmitForm={handleSubmitProjects} 
                    loading={prLoading} 
                    setLoading={setPrLoading} 
                    onSubmitSuccess={onSubmitSuccessProjects} 
                    data={prTableContent}
                />,
    },
    {
        id: 5,
        label: 'Education',
        content: <WrapedTable 
                    dataHeader={educationFields} 
                    handleSubmitForm={handleSubmitEducations} 
                    loading={edLoading} 
                    setLoading={setEdLoading} 
                    onSubmitSuccess={onSubmitSuccessEducations} 
                    data={edTableContent}
                />,
    },
    {
        id: 6,
        label: 'Achievements',
        content: <WrapedTable 
                    dataHeader={AchievementsFields} 
                    handleSubmitForm={handleSubmitAchievement} 
                    loading={achLoading} 
                    setLoading={setEdLoading} 
                    onSubmitSuccess={onSubmitSuccessAchievements} 
                    data={achTableContent}
                />,
    },
  ];

  return (
    <>
     <main className="h-full">
      {/* <Navbar toggle={sidebarToggle} /> */}
        <div className="min-h-screen">
            <div className="p-6 flex flex-row items-center">
                <h1 className="flex-1 font-bold text-2xl text-gray-800"></h1>
                <button
                    onClick={handlePreview}
                    className="p-3 max-w-fit bg-blue-500 text-white rounded-md mr-4"
                >
                    <FontAwesomeIcon icon={faEye} className="mr-2" />
                    Preview
                </button>
                <ReactToPrint 
                    trigger={()=>(
                        <button
                            // onClick={handlePrint}
                            className="p-3 max-w-fit bg-green-500 text-white rounded-md"
                        >
                            <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
                            Print PDF
                        </button>
                     )}
                    content={()=>pdfRef.current}
                />
                
                {/* <iframe
                    ref={pdfRef}
                    className="hidden"
                    src="URL_TO_YOUR_PDF"
                    title="Resume PDF"
                /> */}
            </div>
            <Modal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}>

                        <ProfilePreview
                            ref={pdfRef}
                            basicInfoContent={basicInfoContent}
                            weTableContent={weTableContent}
                            prTableContent={prTableContent}
                            edTableContent={edTableContent}
                            achTableContent={achTableContent}
                        />

            </Modal>
            <div className=" container mx-auto p-6">
                <Tab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
        </div>
     </main>
    </>
  );
};

export default UserProfilePage;
