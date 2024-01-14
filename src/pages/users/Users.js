import { faEnvelope, faInfo, faLock, faToggleOn, faUser, faUserCircle, faUserShield, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import WrapedTable from "components/Datatables/WrapedTable";
import Navbar from "components/Navbar/Index";
import { useApi } from "customHooks/useApi";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useAlertContext } from "utils/alertUtils";
import { sidebarToggle } from "utils/toggler";
import * as yup from "yup";

export default function Users(){
    const [loading , setLoading] = useState(false)
    const {showAlert} = useAlertContext();
    const [userContent , setUserContent] = useState([])
    const getApiEffect = useRef(false);
    const { fetchData } = useApi()
    const userFields = [
        {
          name: "firstName",
          key: "firstName",
          type: "text",
          label: "First Name",
          col: "md:w-1/2",
          icon: <FontAwesomeIcon icon={faUser} />, // User icon
          placeholder: "Enter first name",
          validation: yup.string().required("First name is required"),
        },
        {
          name: "lastName",
          key: "lastName",
          type: "text",
          label: "Last Name",
          icon: <FontAwesomeIcon icon={faUser} />, // User icon
          placeholder: "Enter last name",
          col: "md:w-1/2",
          validation: yup.string().required("Last name is required"),
        },
        {
          name: "userName",
          key: "userName",
          type: "text",
          label: "User Name",
          icon: <FontAwesomeIcon icon={faUser} />, // User icon
          col: "md:w-1/2",
          placeholder: "Enter user name",
          validation: yup.string().required("User name is required"),
        },
        {
          name: "eMail",
          key: "eMail",
          type: "text",
          label: "Email",
          icon: <FontAwesomeIcon icon={faEnvelope} />, // Envelope icon
          col: "md:w-1/2",
          placeholder: "Enter email",
          validation: yup.string().email("Invalid email format").required("Email is required"),
        },
        {
          name: "description",
          key: "description",
          type: "text",
          label: "Description",
          icon: <FontAwesomeIcon icon={faInfo} />, // Info icon
          col: "md:w-1/2",
          placeholder: "Enter description",
          validation: yup.string(),
        },
        {
            name: "roles",
            key: "roles",
            type: "select",
            label: "Roles",
            col: "md:w-1/2",
            icon: <FontAwesomeIcon icon={faUsers} />, // Users icon
            options: [], // You can populate the options dynamically
          },
          {
            name: "password",
            key: "password",
            type: "password",
            label: "Password",
            icon: <FontAwesomeIcon icon={faLock} />, // Lock icon
            col: "md:w-1/2",
            placeholder: "Enter password",
            validation: yup.string().required("Password is required"),
          },
        {
          name: "isAdminRole",
          key: "isAdminRole",
          type: "toggle",
          col: "md:w-1/4",
          label: "Admin Role",
          icon: <FontAwesomeIcon icon={faUserShield} />, // User Shield icon
        },
        {
            name: "isActive",
            key: "isActive",
            type: "toggle",
            col: "md:w-1/4",
            label: "Active",
            icon: <FontAwesomeIcon icon={faToggleOn} />, // Toggle On icon
        },
        
        
      ];
      useEffect(()=>{
        if(getApiEffect.current === false || loading) {

          fetchData('/UserAsync', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
          }).then(data=>setUserContent(data))
          return () => getApiEffect.current = true
        }
      },[loading])
      
      const handleSubmitUser = async (method, data) => {
        const url = '/User';
          try {
            const response = await fetchData(url, {
              method: 'POST',
              data: JSON.stringify(data),
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`,
              },
            });
          } catch (error) {
  
          }
        }
    return(
      <>
      <main className='h-full'>
      {/* <Navbar toggle={sidebarToggle} /> */}
      
        <div className="p-6">
  
            <div className="mb-6 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">Create New User</h2>
            <WrapedTable
                dataHeader={userFields}
                handleSubmitForm={handleSubmitUser}
                loading={loading}
                setLoading={setLoading}
                // onSubmitSuccess={onSubmitSuccessOrder}
                data={userContent}
            />
            </div>
        </div>
        </main>
        </>
    );
}