/** @format */

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AiOutlineFieldTime,
  AiOutlineFileText,
  AiOutlineHome,
  AiOutlineMenu,
} from "react-icons/ai";
import { FaKey, FaQuestion } from "react-icons/fa6";
import { IoIosUnlock, IoMdHelpCircleOutline } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { PiStudent, PiUsersFourFill } from "react-icons/pi";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import ModalSection from "../ModalSection/ModalSection";
import { useForm } from "react-hook-form";
import useAction from "@/Utils/Hooks/UseAction";
import { ChangeData } from "@/Redux/Featuers/Auth/ChangeSlice";
import { toast } from "react-toastify";


export default function SideBar() {
  const { t, i18n } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();
  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const logOut = () => {
    localStorage.removeItem("UserToken");
    localStorage.removeItem("UserRole");
    navigate("/");
  };

  const role = localStorage.getItem("UserRole");
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [passType, setPassType] = useState("password");

  const handleChangePassword = useAction(ChangeData);
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    await handleChangePassword(data)
      .then((res) => {
        if (res?.data?.message) {
          toast.success(res.data.message);
          toggleModal()
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

      <ModalSection textBtn="Submit" modalTitle="Change Password" handleSubmit={handleSubmit(onSubmit)} {...{ openModal, setOpenModal, isLoading }}>
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
            onChange={() => {
              setShowPass((prev) => !prev);
            }}
          />
          <label className="text-orange-200" htmlFor="passType">
            {showPass ? "hide password" : "show password "}
          </label>
        </div>

      </ModalSection>
      <div>
        <div className="sidebar-container ">
          <Sidebar
            collapsed={isCollapsed}
            rtl={i18n.language == "ar" ? true : false}
          >
            <Menu className="border border-[#ddd] h-[100vh]">
              <MenuItem
                onClick={handleToggle}
                icon={<AiOutlineMenu className=" text-[30px]" />}
              ></MenuItem>

              {role === "Student" ? (
                ""
              ) : (
                <>
                  <MenuItem
                    className="border-b border-black hover:bg-secondColor"
                    icon={<AiOutlineHome className="bg-secondColor text-[30px]" />}
                    component={<Link to="home" />}
                  >
                    {t("dashboard")}
                  </MenuItem>
                  <MenuItem
                    className="border-b border-black hover:bg-secondColor"
                    icon={
                      <PiUsersFourFill className="bg-secondColor text-[30px]" />
                    }
                    component={<Link to="groups" />}
                  >
                    {t("groups")}
                  </MenuItem>

                  <MenuItem
                    className="border-b border-black hover:bg-secondColor"
                    icon={<PiStudent className="bg-secondColor text-[30px]" />}
                    component={<Link to="student" />}
                  >
                    {t("students")}
                  </MenuItem>
                </>
              )}

              <MenuItem
                className="border-b border-black hover:bg-secondColor"
                icon={
                  <AiOutlineFieldTime className="bg-secondColor text-[30px]" />
                }
                component={<Link to="quiz" />}
              >
                {t("quizzes")}
              </MenuItem>

              {role === "Student" ? (
                ""
              ) : (
                <MenuItem
                  className="border-b border-black hover:bg-secondColor"
                  icon={<FaQuestion className="bg-secondColor text-[30px]" />}
                  component={<Link to="questions" />}
                >
                  {t("questions")}
                </MenuItem>
              )}

              <MenuItem
                className="border-b border-black hover:bg-secondColor"
                icon={
                  <AiOutlineFileText className="bg-secondColor text-[30px]" />
                }
                component={<Link to="results" />}
              >
                {t("results")}
              </MenuItem>

              <MenuItem
                onClick={toggleModal}
                className="border-b border-black hover:bg-secondColor"
                data-modal-target="default-modal"
                data-modal-toggle="default-modal"
                icon={<IoIosUnlock className="bg-secondColor text-[30px]" />}
              >
                {t("changePassword")}
              </MenuItem>

              <MenuItem
                className="border-b border-black hover:bg-secondColor"
                onClick={logOut}
                icon={<LuLogOut className="bg-secondColor text-[30px]" />}
              >
                {t("logout")}
              </MenuItem>

              <MenuItem
                className="border-b border-black hover:bg-secondColor"
                icon={
                  <IoMdHelpCircleOutline className="bg-secondColor text-[30px]" />
                }
              >
                {t("help")}
              </MenuItem>
            </Menu>
          </Sidebar>
        </div>
      </div>
    </>
  );
}
