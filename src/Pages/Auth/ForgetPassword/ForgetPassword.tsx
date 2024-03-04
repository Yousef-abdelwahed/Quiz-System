/** @format */

import React, { useState } from "react";
import "./ForgetPassword.module.scss";
import { background5 } from "@/Assets/Images";
import { FaCheckCircle, FaEnvelope } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import baseUrl from "@/Utils/Custom/Custom";
import { toast } from "react-toastify";
import { TbFidgetSpinner } from "react-icons/tb";
import useAction from "@/Utils/Hooks/UseAction";
import { ForgetData } from "@/Redux/Featuers/Auth/ForgetSlice";

const ForgetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let RegistrationData = useAction(ForgetData);
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    await RegistrationData(data)
      .then((res) => {
        if (res?.data?.message) {
          console.log(res);
          toast.success(res.data.message);
          setIsLoading(false);
          navigate("/reset-password");
        } else {
          console.log(res);
          toast.error(res?.response?.data?.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <div className="bg-mainBg">
        <div className="container mx-auto h-screen">
          <div className="grid grid-cols-1  gap-4 lg:grid-cols-2 pt-5">
            <div className="px-9 sm:p-0">
              <Link to="/">
                <div className="flex items-center text-white mb-8">
                  <p className="text-2xl mx-1">Quizwiz</p>
                </div>
              </Link>
              <h2 className="text-mainColor font-semibold text-2xl my-3">
                Forgot password
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="email my-10">
                  <label htmlFor="email" className="text-white font-semibold">
                    Email address
                  </label>
                  <div className="flex items-center mt-2 rounded-md border-2 border-white">
                    <span className="flex items-center me-3 pl-3 text-white ">
                      <FaEnvelope />
                    </span>
                    <input
                      type="email"
                      id="email"
                      className="px-2 outline-none  flex-1 border-none  bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400  sm:text-sm sm:leading-6"
                      placeholder="Type your email"
                      {...register("email", {
                        required: "email is required!!",
                        pattern: {
                          value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                          message: "invalid email!!",
                        },
                      })}
                    />
                    {errors?.email ? (
                      <span className="text-red-600">
                        {errors?.email?.message}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="flex items-center my-20">
                  <button
                    type="submit"
                    className={
                      "bg-slate-50 flex items-center justify-center transition duration-100 hover:bg-gray-800  text-slate-950  hover:text-slate-50  rounded-lg p-5 py-2 mt-3 font-bold" +
                      (isLoading ? " disabled" : " ")
                    }
                  >
                    {isLoading == true ? (
                      <TbFidgetSpinner className="animate-spin" />
                    ) : (
                      <>
                        Send email
                        <span>
                          <FaCheckCircle className="mx-2 text-xl rounded-full" />
                        </span>
                      </>
                    )}
                  </button>
                </div>
                <div className="flex justify-end">
                  <p className="text-white font-semibold">
                    Login?
                    <Link to="/" className="text-mainColor underline">
                      click here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
            <div className="w-full hidden   lg:flex justify-end items-center">
              <div className="w-[90%] bg-[#FFEDDF] p-3 rounded-lg">
                <img src={background5} className="w-full" alt="login-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
