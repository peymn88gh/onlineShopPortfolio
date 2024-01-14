import {faFacebook, faGoogle} from "@fortawesome/free-brands-svg-icons";
import {faCheck, faEnvelope, faLock, faSpinner, faUndo, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import {Link, json, useNavigate} from "react-router-dom";
import * as yup from "yup";
import {useTranslation} from "react-i18next";
import DynamicFormSection from "components/Form/DynamicFormSection";
import axios from "axios";
import { Input } from "components";
import SecondaryButton from "components/Button/SecondaryButton";
import useTimer from "customHooks/timer";
import PrimaryIconButton from "components/Button/PrimaryIconButton";
import { useAuth } from "context/AuthContext";
import { useAlertContext } from "utils/alertUtils";

function RegisterIndex() {
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation('common');

    const registerImage = "/images/login.cc0578413db10119a7ff.png";

    return (
        <div className="flex min-h-screen">
            <div className="flex w-full flex-col md:flex-row">
                {/* Image */}
                <div className="md:bg-emerald-500 md:min-h-screen flex flex-wrap md:w-1/2">
                    <div className="items-center text-center flex flex-col relative justify-center mx-auto">
                        <img
                            src={registerImage}
                            alt="Logo"
                            className="md:w-72 w-48 mx-auto"
                        />
                        <div className="md:block hidden text-slate-100">
                            <h1 className="font-semibold text-2xl pb-2">
                                {t('register')+' ' +t('anAccount')}
                            </h1>
                            <span className="text-sm">
                                  TaraSystem
                            </span>
                        </div>
                    </div>
                </div>
                {/* Register Section */}
                <div className="flex flex-col md:flex-1 items-center justify-center">
                    <div className="loginWrapper flex flex-col w-full lg:px-36 md:px-8 px-8 md:py-8">
                        {/* Login Header Text */}
                        <div className="hidden md:block font-medium self-center text-xl sm:text-3xl text-gray-800">
                            {t("createAccount")}
                        </div>

                        {/* Separator */}
                        <div className="hidden md:block relative mt-10 h-px bg-gray-300">
                            <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                                  <span className="bg-white px-4 text-xs text-gray-500 uppercase">
                                    {t("registerYourAccountNow")+". "+t("itsFree")+'!'}
                                  </span>
                            </div>
                        </div>


                        {/* Register Form */}
                        <RegisterForm loading={loading} setLoading={setLoading}/>

                        {/* Separator */}
                        <div className="relative mt-6 h-px bg-gray-300">
                            <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                                    <span className="bg-white px-4 text-xs text-gray-500 uppercase">
                                        {t("or")}
                                    </span>
                            </div>
                        </div>

                        {/* Social Button */}
                        <div className="flex justify-between w-full mt-6">
                            <button
                                type="submit"
                                className="flex items-center justify-center focus:outline-none text-slate-500 text-sm bg-slate-200 rounded-lg md:rounded md:py-2 px-3 py-3 w-full transition duration-150 ease-in"
                            >
                                <FontAwesomeIcon icon={faGoogle}/>
                                <span className="mr-2 flex-1">{t('loginWith')+' Google'}</span>
                            </button>

                            {/* todo: implement react oauth google*/}
                        </div>
                        <div className="flex justify-between w-full mt-2">
                            <button
                                disabled={loading}
                                type="submit"
                                className="flex items-center justify-center focus:outline-none text-slate-500 text-sm bg-slate-200 rounded-lg md:rounded md:py-2 px-3 py-3 w-full transition duration-150 ease-in"
                            >
                                <FontAwesomeIcon icon={faFacebook}/>
                                <span className="mr-2 flex-1">{t('loginWith')+ ' Facebook'}</span>
                            </button>
                        </div>
                        {/* End Social Button */}

                        {/* Login Link */}
                        <div className="flex justify-center items-center my-6 md:mb-0">
                            <Link
                                to="/auth/login"
                                className="inline-flex items-center font-bold text-emerald-500 hover:text-emerald-700 text-xs text-center"
                            >
                              <span>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                  <path
                                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                                </svg>
                              </span>
                                <span className="ml-2">{t('alreadyHaveAnAccount')+'?'}</span>
                            </Link>
                        </div>
                        {/* End Login Link */}
                    </div>
                </div>
            </div>
        </div>
    );
}

function RegisterForm({loading, setLoading}) {
    const [registerData, setRegisterData] = useState(null)
    const [userId, setUserId] = useState(null)
    // console.log(registerData,'registerData'); 
    const { t } = useTranslation('common');
    const { showAlert } = useAlertContext();
    const navigate = useNavigate();
    const registerFormFields = [
        {
          name: "eMail",
          type: "text",
          label: `${t("eMailAddress")}`,
          icon: <FontAwesomeIcon icon={faEnvelope} />,
          placeholder : `${t("enterYourEmai")}`,
          validation: yup.string().email(t('emailIsNotValid')).required(t("eMailAddress") +" " +t("isRequired")),
        },
        {
          name: "firstName",
          type: "text",
          label: `${t("firstName")}`,
          placeholder: `${t("firstName")}`,
          icon: <FontAwesomeIcon icon={faUser} />,
          validation: yup.string().required(t("firstName")+" "+t("isRequired")),
        },
        {
            name: "lastName",
            type: "text",
            label: `${t("lastName")}`,
            placeholder: `${t("lastName")}`,
            icon: <FontAwesomeIcon icon={faUser} />,
            validation: yup.string().required(t("lastName")+" "+t("isRequired")),
        },
        {
          name: "password",
          type: "password",
          label: `${t("password")}`,
          icon: <FontAwesomeIcon icon={faLock} />,
          placeholder : `${t("enterYourPassword")}`,
          validation: yup.string().required(t("password")+" "+t("isRequired")).min(8, t('passwordMustBeAtLeast8Characters')),
        },
        {
          name: "confirmPassword",
          type: "password",
          label: `${t("confirmPassword")}`,
          icon: <FontAwesomeIcon icon={faLock} />,
          placeholder : `${t("confirmPassword")}`,
          validation: yup.string().oneOf([yup.ref('password'), null], t("passwordsMustMatch")).required(t("passwordConfirmation")+" "+t("isRequired")).min(8, t('passwordMustBeAtLeast8Characters'))
        }
      ];
    function handleSubmitRegister(method, data){
        if(method==='post'){
            data.id = 0
            data.status = 0
            data.userName = data.eMail
            setLoading(true)
            return new Promise((resolve, reject) => {
                let tokenForUesr = process.env.REACT_APP_ADMIN_USERNAME;
                let userPassword = process.env.REACT_APP_ADMIN_PASSWORD;
                axios.post(`${process.env.REACT_APP_TOKEN_ENDPOINT}`, {"username" : tokenForUesr , "password" : userPassword}).then((res)=>{
                    const { token } = res.data;
                    axios.post(`${process.env.REACT_APP_BASE_URL}/User`,JSON.stringify(data), {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    }).then(res=>{
                        setUserId(res.data)
                        resolve()
                    })
                    .catch(error=>reject(error))
                })                
            })  
        }
    }

    function handleEmailVerification(data){
        const completedRegistrationData = Object.assign({},data)
        setRegisterData(completedRegistrationData);
    }

    return (
    <div className="md:mt-10 mt-4">
        {!registerData && 
            <DynamicFormSection
            t={t} 
            formFields={registerFormFields} 
            handleSubmitForm={handleSubmitRegister} 
            onSubmitSuccess={handleEmailVerification}
            showActionButtons={false} 
            externalActionButtons={
                <SubmitButton t={t} loading={loading} />
            }
            />
        }
        {registerData && <VerificationSection registerData={registerData} userId={userId}/>}

    </div>
    )
}

export default RegisterIndex;

function SubmitButton({t, loading}){
    return(
        <div className="flex w-full mt-2">
            <button
                disabled={loading}
                type="submit"
                className="flex items-center justify-center focus:outline-none text-white text-sm bg-emerald-500 hover:bg-emerald-700 rounded-lg md:rounded md:py-2 py-3 w-full transition duration-150 ease-in"
            >
                <span className="mr-2 md:uppercase">
                    {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : ''}{' '}
                    {loading ? t("processing") : t("register")}
                </span>
            </button>
        </div>
    )
}


function VerificationSection({registerData, userId}) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlertContext();

  const handleSubmit = () => {
    
    setLoading(true)
    let tokenForUesr = registerData.eMail;
    let userPassword = registerData.password;
    axios.post(`${process.env.REACT_APP_TOKEN_ENDPOINT}`, {"username" : tokenForUesr , "password" : userPassword}).then((res)=>{
        const { token } = res.data;
        const packet = new FormData()
        packet.append('ToEmail' , registerData.eMail)
        packet.append('UserId' , userId)
        packet.append('Subject' , 'Email Verification')
        packet.append('Body' , `http://localhost:3000/email-verification?token=${token}&userId=${userId}`)
        axios.post(`${process.env.REACT_APP_BASE_URL}/EMail/send`, packet, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }
        }).then(res=>{
            navigate('/auth/login')
            showAlert('success' , 'varification email sended')
        }).catch(err => showAlert('failed' , `${err.message}`)).finally(()=>{
            setLoading(false)
            navigate('/auth/login')
        })
    }).catch(err => showAlert('failed' , `${err.message}`))
  };

  return (
    <div className=" text-center">
        <div className=" inline-block">
            <PrimaryIconButton loading={loading} onClick={handleSubmit} icon={<FontAwesomeIcon icon={faCheck}/>}>
                Verify your Email
            </PrimaryIconButton>
        </div>
    </div>
        
  );
};

