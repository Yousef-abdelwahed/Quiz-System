/** @format */

import { background5 } from "@/Assets/Images";
import { LoginData } from "@/Redux/Featuers/Auth/LoginSlice";
import useAction from "@/Utils/Hooks/UseAction";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaCheckCircle,
  FaEnvelope,
  FaKey,
  FaUserPlus,
  FaUserTie,
} from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.module.scss";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [passType, setPassType] = useState("password");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let loginData = useAction(LoginData);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    await loginData(data)
      .then((res) => {
        console.log(res);
        if (res?.data?.data?.accessToken) {
          localStorage.setItem("UserToken", res?.data.data.accessToken);
          localStorage.setItem("UserRole", res?.data.data.profile.role);
          toast.success(res.data.message);
          navigate("/dashboard");
        } else {
          if (typeof res?.response?.data?.message == "object") {
            toast.error(res?.response?.data?.message[0]);
          } else {
            toast.error(res?.response?.data?.message);
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (showPass) {
      setPassType("text");
      return;
    }
    setPassType("password");
  }, [showPass]);
  return (
    <>
      <div className="bg-mainBg">
        <div className="container mx-auto h-screen ">
          <div className="grid grid-cols-1  gap-4 lg:grid-cols-2 pt-5 ">
            <div className="p-11 sm:p-0">
              <Link to="/">
                <div className="flex items-center text-white mb-8">
                  <p className="text-2xl mx-1">Quizwiz</p>
                </div>
              </Link>
              <h2 className="text-mainColor font-semibold text-2xl my-3 ">
                Continue your learning journey with QuizWiz!
              </h2>

              <div className="flex items-center md:w-[100px]  py-5">
                <div className="bg-stone-700 me-[50px] p-[50px] rounded-lg text-center py-3 border-4 border-[#C5D86D]">
                  <FaUserTie className="text-mainColor text-6xl m-auto" />
                  <span className="text-white">Sign in</span>
                </div>
                <Link to="/register">
                  <div className=" bg-stone-700  p-[50px] rounded-lg text-center py-3 border-4 border-stone-700">
                    <FaUserPlus className="text-white text-6xl m-auto" />
                    <span className="text-white">Sign Up</span>
                  </div>
                </Link>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-2">
                  <label htmlFor="email" className=" text-white font-semibold">
                    Registered email address
                  </label>
                  <div className="flex items-center mt-2 rounded-md border-2 border-white">
                    <span className="flex items-center me-3 pl-3 text-white ">
                      <FaEnvelope />
                    </span>
                    <input
                      type="email"
                      id="email"
                      className="px-2 rounded-r-md outline-none flex-1 border-none  bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400  sm:text-sm sm:leading-6"
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
                <div className="my-4">
                  <label
                    htmlFor="password"
                    className="text-white font-semibold"
                  >
                    Password
                  </label>
                  <div className="flex items-center mt-2 rounded-md border-2 border-white">
                    <span className="flex  items-center me-3 pl-3 text-white ">
                      <FaKey />
                    </span>
                    <input
                      type={passType}
                      id="password"
                      className="px-2 rounded-r-md  flex-1 outline-none  bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400  sm:text-sm sm:leading-6"
                      placeholder="Type your password"
                      {...register("password", {
                        required: "password is required!!",
                      })}
                    />
                    {errors?.password ? (
                      <span className="text-red-600">
                        {errors?.password?.message}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="form-group">
                  <input
                    className="mx-1"
                    type="checkbox"
                    name="passType"
                    checked={showPass}
                    onChange={() => {
                      setShowPass((prev) => !prev);
                    }}
                  />
                  <label className="text-orange-200" htmlFor="passType">
                    {showPass ? "hide password" : "show password "}
                  </label>
                </div>
                <div className="flex items-center justify-between my-4">
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
                        Sign In
                        <span>
                          <FaCheckCircle className="mx-2 text-xl rounded-full" />
                        </span>
                      </>
                    )}
                  </button>
                  <p className="text-slate-300 font-semibold">
                    Forgot password?
                    <Link
                      to="/forget-password"
                      className="text-mainColor mx-1 underline"
                    >
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

export default Login;
