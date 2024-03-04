/** @format */

import { background5 } from "@/Assets/Images";
import { ChangeData } from "@/Redux/Featuers/Auth/ChangeSlice";
import useAction from "@/Utils/Hooks/UseAction";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheckCircle, FaKey } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [passType, setPassType] = useState("password");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let Data = useAction(ChangeData);
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    await Data(data)
      .then((res) => {
        if (res?.data?.message) {
          toast.success(res.data.message);
          setIsLoading(false);
          navigate("/");
        } else {
          toast.error(res?.response?.data?.message);
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
        <div className="container mx-auto h-screen">
          <div className="grid grid-cols-1  gap-4 lg:grid-cols-2 pt-5">
            <div className="p-11 sm:p-0">
              <Link to="/">
                <div className="flex items-center text-white mb-8">
                  <FaRegCircleXmark className="text-5xl" />
                  <FaCheckCircle className="text-5xl" />
                  <p className="text-2xl mx-1">| Quizwiz</p>
                </div>
              </Link>
              <h2 className="text-mainColor font-semibold text-2xl my-3">
                Change password
              </h2>

              <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="oldPassword mt-2">
                  <label
                    htmlFor="oldPassword"
                    className="text-white font-semibold"
                  >
                    Old Password
                  </label>
                  <div className="flex items-center mt-2 rounded-md border-2 border-white">
                    <span className="flex items-center me-3 pl-3 text-white">
                      <FaKey />
                    </span>
                    <input
                      type={passType}
                      id="oldPassword"
                      className="px-2 rounded-r-md outline-none  flex-1 border-none  bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400  sm:text-sm sm:leading-6"
                      placeholder="Type your old password"
                      {...register("password", {
                        required: true,
                      })}
                    />
                    {errors.password && errors.password.type === "required" && (
                      <span className="text-red-600">
                        password is required!!
                      </span>
                    )}
                    {errors.password && errors.password.type === "pattern" && (
                      <span className="text-red-600">invalid password!!</span>
                    )}
                  </div>
                </div>
                <div className="newPassword mt-2">
                  <label
                    htmlFor="newPassword"
                    className="text-white font-semibold"
                  >
                    New Password
                  </label>
                  <div className="flex items-center mt-2 rounded-md border-2 border-white">
                    <span className="flex  items-center me-3 pl-3 text-white ">
                      <FaKey />
                    </span>
                    <input
                      type={passType}
                      id="newPassword"
                      className="px-2 rounded-r-md  outline-none flex-1 border-none  bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400  sm:text-sm sm:leading-6"
                      placeholder="Type your new password"
                      {...register("password_new", {
                        required: true,
                      })}
                    />
                    {errors.password_new &&
                      errors.password_new.type === "required" && (
                        <span className="text-red-600">
                          New password is required!!
                        </span>
                      )}
                  </div>
                </div>
                <div className="form-group">
                  <input
                    className="mx-1"
                    type="checkbox"
                    name="passType"
                    checked={showPass}
                    onChange={(e) => {
                      setShowPass((prev) => !prev);
                    }}
                  />
                  <label className="text-orange-200" htmlFor="passType">
                    {showPass ? "hide password" : "show password "}
                  </label>
                </div>

                <div className="my-4">
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
                        Change
                        <span>
                          <FaCheckCircle className="mx-2 text-xl rounded-full" />
                        </span>
                      </>
                    )}
                  </button>
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
}
