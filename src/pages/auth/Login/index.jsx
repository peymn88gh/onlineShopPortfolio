import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAlertContext } from 'utils/alertUtils';
import {Input} from "components";
import { useAuth } from "context/AuthContext";
import { useTranslation } from "react-i18next";

function LoginIndex() {
  const {login, loading, user} = useAuth();
  const {t} = useTranslation('common');
  
  const LoginImage =
    "/images/login.cc0578413db10119a7ff.png";
  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex w-full flex-col md:flex-row">
          {/* Image */}
          <div className="md:bg-slate-600 md:min-h-screen flex flex-wrap md:w-1/2">
            <div className="items-center text-center flex flex-col relative justify-center mx-auto">
              <img
                src={LoginImage}
                alt="Logo Login"
                className="md:w-72 w-48 mx-auto"
              />
              <div className="md:block hidden text-slate-100">
                <h1 className="font-semibold text-2xl pb-2">
                  {t('loginToYourAccount')}
                </h1>
                <span className="text-sm">
                  Tara System
                </span>
              </div>
            </div>
          </div>
          {/* Login Section */}
          <div className="flex flex-col md:flex-1 items-center justify-center">
            <div className="loginWrapper flex flex-col w-full lg:px-36 md:px-8 px-8 md:py-8">
              {/* Login Header Text */}
              <div className="hidden md:block font-medium self-center text-xl sm:text-3xl text-gray-800">
                {t('welcomeBack')}!
              </div>

              {/* Sparator */}
              <div className="hidden md:block relative mt-10 mb-10 h-px bg-gray-300">
                <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                  <span className="bg-white px-4 text-xs text-gray-500 uppercase">
                    {t('loginWithEmailOrUsername')}
                  </span>
                </div>
              </div>

              <div className="md:hidden block my-4">
                <h1 className="text-2xl font-semibold">{t('login')}</h1>
              </div>

              {/* Login Form */}
              <LoginForm loading={loading} login={login} t={t} />
              
              {/* Sparator */}
              <div className="relative mt-6 h-px bg-gray-300">
                <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                  <span className="bg-white px-4 text-xs text-gray-500 uppercase">
                    {t('or')}
                  </span>
                </div>
              </div>

              {/* Social Button */}
              <div className="flex justify-between w-full mt-6">
                <button
                  disabled={loading}
                  type="submit"
                  className="flex items-center justify-center focus:outline-none text-slate-500 text-sm bg-slate-200 rounded-lg md:rounded md:py-2 px-3 py-3 w-full transition duration-150 ease-in"
                >
                  <FontAwesomeIcon icon={faGoogle} />
                  <span className="mr-2 flex-1">{t('loginWith')} Google</span>
                </button>
              </div>
              <div className="flex justify-between w-full mt-2">
                <button
                  disabled={loading}
                  type="submit"
                  className="flex items-center justify-center focus:outline-none text-slate-500 text-sm bg-slate-200 rounded-lg md:rounded md:py-2 px-3 py-3 w-full transition duration-150 ease-in"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                  <span className="mr-2 flex-1">{t('loginWith')} Facebook</span>
                </button>
              </div>
              {/* End Social Button */}

              {/* Register Link */}
              <div className="flex justify-center items-center  my-6 md:mb-0">
                <Link
                  to="/auth/register"
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
                      <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                    </svg>
                  </span>
                  <span className="ml-2">{t('dontHaveAnAccountYet')}</span>
                </Link>
              </div>
              {/* End Register Link */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const LoginForm = ({loading, login, t}) => {
console.log(window.location.pathname);
  const { showAlert } = useAlertContext();
  const navigate = useNavigate();
  const locationHook = useLocation()
  const schema = yup.object().shape({
    email: yup.string().required(`Email ${t("isRequired")}`),
    password: yup.string().required(`Password ${t("isRequired")}`),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) =>{
    // setLoading(true);
    loginRequest(data);
  }
  const loginRequest = async (data) => {
    login(data).then(res=>res==='loggedIn' && window.location.pathname.split('/').includes('auth') ? navigate(locationHook.state?.backto ?? '/') : navigate('/panel'))
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            type="text"
            label={t("eMailAddress")}
            name="email"
            value={field.value}
            onChange={field.onChange}
            placeholder={t("enterYourEmai")}
            error={errors.email?.message}
            icon={<FontAwesomeIcon icon={faEnvelope}/>}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            type="password"
            label={t("password")}
            name="Password"
            value={field.value}
            onChange={field.onChange}
            placeholder={t("enterYourPassword")}
            error={errors.password?.message}
            icon={<FontAwesomeIcon icon={faLock}/>}
          />
        )}
      />

      <Button loading={loading} type="submit" label={t("login")} />
    </form>
  );
};


const Button = ({ type, label, loading }) => {
  return (
    <div className="flex w-full mt-6">
      <button
        id="login-button" 
        disabled={loading}
        type={type}
        className=" disabled:bg-slate-600 flex items-center justify-center focus:outline-none text-white text-sm bg-emerald-500 hover:bg-emerald-700 rounded-lg md:rounded md:py-2 py-3 w-full transition duration-150 ease-in"
      >
        <span className="mr-2 md:uppercase">{label}</span>
      </button>
    </div>
  );
};

export default LoginIndex;
