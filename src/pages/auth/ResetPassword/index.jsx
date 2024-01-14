import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useLocation  } from "react-router-dom";
import { useAlertContext } from 'utils/alertUtils';
import { useTranslation } from 'react-i18next';
import Cookies from "js-cookie";

function ResetPasswordIndex() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [t] = useTranslation('common');
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlertContext();

  const handleSubmit = () => {
    setError(false);
    setLoading(true);
        if(Cookies.get('token')){
          const emailApi = process.env.REACT_APP_BASE_URL +'/EMail/send';
          const tHead = {"Content-Type": "application/json", "Authorization": "Bearer " + Cookies.get('token')}
          const tokenRequestOptions = {
              method: 'POST',
              headers: tHead,
              body: JSON.stringify({ToEmail : email}),
              url: emailApi,
          };
          axios(tokenRequestOptions)
            .then(r => {
              showAlert('success', t("passwordSentSuccessfully"));
              navigate("/auth/login")
              setLoading(false)
            })
            .catch(error => {
              if(error?.response?.status === 401)
                showAlert('failed', t("needToLogin"))
              else
                showAlert('failed', t("failedToSendEmail!"))
              setLoading(false)
            })
        }
        else{
          showAlert('failed', t("needToLogin"))
          setLoading(false)
        }
  };
  const LoginImage =
    "/images/login.cc0578413db10119a7ff.png";
  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex w-full fex-col md:flex-row">
          {/* Image */}
          <div className="md:bg-orange-800 md:min-h-screen flex flex-wrap md:w-1/2">
            <div className="items-center text-center flex flex-col relative justify-center mx-auto">
              <img
                src={LoginImage}
                alt="Logo"
                className="md:w-72 w-48 mx-auto"
              />
              <div className="md:block hidden text-slate-100">
                <h1 className="font-semibold text-2xl pb-2">
                  {t('sendPasswordToEmail')}
                </h1>
              </div>
            </div>
          </div>
          {/* Login Section */}
          <div className="flex flex-col md:flex-1 items-center justify-center">
            <div className="loginWrapper flex flex-col w-full lg:px-36 md:px-8 px-8 md:py-8"> 
              {/* Login Header Text */}
              <div className="hidden md:block font-medium self-center text-xl sm:text-3xl text-gray-800">
                {location.pathname.includes("forgot-password") ? t("forgotPassword") : t("resetPassword")}
              </div>
              {/* Sparator */}
              <div className="hidden md:block relative mt-10 h-px bg-gray-300">
                <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                  <span className="bg-white px-4 text-xs text-gray-500 uppercase">
                    {t("emailToSendPassword")}
                  </span>
                </div>
              </div>

              {/* Login Form */}
              <div className="md:mt-10 mt-4">
                <form >
                  {/* Username */}
                  <div className="flex flex-col mb-3">
                    <div className="relative">
                      <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </div>

                      <input
                        id="email"
                        type="text"
                        name="email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError(false)
                          }
                        }
                        className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400"
                        placeholder="E-Mail Address"
                      />
                    </div>
                    {error&& (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                       {t("emailIsNotValid")} 
                      </span>
                    )}
                  </div>

                  {/* back to login Link */}
                  <div className="flex items-center mb-6 mt-2 ">
                    <div className="flex ml-auto">
                      <Link
                        to="/auth/login"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        className="inline-flex font-semibold text-xs sm:text-sm text-emerald-500 hover:text-emerald-700"
                      >
                        {t("loginPage")}
                      </Link>
                    </div>
                  </div>

                  {/* Button Login */}
                  <div className="flex w-full">
                    <button
                    onClick={(e)=>{
                        e.preventDefault();
                        if(
                          String(email)
                          .toLowerCase()
                          .match(
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        ))
                          handleSubmit();
                        else
                          setError(true)
                    }}
                      disabled={loading}
                      type="submit"
                      className="flex items-center justify-center focus:outline-none text-white text-sm bg-emerald-500 hover:bg-emerald-700 rounded-lg md:rounded md:py-2 py-3 w-full transition duration-150 ease-in"
                    >
                      <span className="mr-2 md:uppercase">
                        {loading ? t("processing") : t("sendPassword")}
                      </span>
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPasswordIndex;
