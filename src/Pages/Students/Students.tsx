/** @format */

import image from "@/Assets/Images/quiz-img.png";
import useAction from "@/Utils/Hooks/UseAction";
import React from "react";
import { useForm } from "react-hook-form";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import "./Students.scss";

import ModalDeleteSection from "@/Components/Shared/ModalSection/ModalDeleteSection";
import ModalViewSection from "@/Components/Shared/ModalSection/ModalViewSection";
import { deleteItem } from "@/Redux/Featuers/Student/DeleteSlice";
import { getStudentData } from "@/Redux/Featuers/Student/getStudentSlice";
import useCurrentUrl from "@/Utils/Hooks/useCurrentUrl";
import { TbFidgetSpinner } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { getStudentDataDetails } from "@/Redux/Featuers/Student/StudentDetailsSlice";
import { Table } from "flowbite-react";
import { LiaEyeSolid } from "react-icons/lia";




const Students = () => {
  const { register, handleSubmit } = useForm();
  // const { t, i18n } = useTranslation();
  const [isActive, setIsActive] = React.useState("React");
  const [studentData, setStudentData] = React.useState(null);
  const [showMore, setShowMore] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [groups, setGroups] = React.useState([]);

  const handleActiveSection = (id) => {
    setIsActive(id);
  };
  const checkActiveClass = (id, className) => {
    return isActive === id ? className : "";
  };
  const modalData = {
    modalTitle: "Add student",
    labelName: "name",
    labelPhone: "Phone",
  };
  const fetchData = useAction(getStudentData);
  const fetchStudentData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchData();
      setStudentData(data.data);
      removeDuplicated(data.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    fetchStudentData();
  }, []);

  const visibleStudents = showMore ? groups : groups?.slice(0, 3);
  const removeDuplicated = async (data) => {
    const uniqueGroups = await [
      ...new Set(
        data
          .map((item) => item?.group?.name)
          .filter((name) => typeof name === "string" && name.trim() !== "")
      ),
    ];
    return setGroups(uniqueGroups);
  };
  const [openModal, setOpenModal] = React.useState(false);
  const [studentId,setStudentId]=React.useState(null);
  const toggleModal = (itemId) => {
    setStudentId(itemId); // Set the id to state or use it as needed
    setOpenModal(!openModal);
  };
  const [hoveredCardId, setHoveredCardId] = React.useState(null);

  return (
    <>
      <div className="border p-4 border-[#ddd] rounded-[10px]">
        <h1 className="font-medium text-xl capitalize ">Students list</h1>
        <div className="py-4 gap-3 flex-initial justify-between  md:space-x-6  max-sm:text-[.8em] base:text-[1rem] max-sm:space-y-2  ">
          {visibleStudents?.map((item) => (
            <div key={item} className="py-2 inline-block	">
              <button
                onClick={() => handleActiveSection(item)}
                type="button"
                className={`border  border-[#ddd] rounded-[2rem] px-5 studentGroupBtn hover:bg-slate-500 hover:text-gray-100	   p-2 space-y-6 
                 ${checkActiveClass(
                   item,
                   "bg-slate-950	text-gray-100		font-medium"
                 )}
                `}
              >
                {item}
              </button>
            </div>
          ))}
          {studentData?.length > 3 && !showMore && (
            <button
              onClick={() => setShowMore(true)}
              className="border border-[#ddd] rounded-[2rem] px-5 studentGroupBtn hover:bg-slate-500 hover:text-gray-100 p-2 space-y-6"
            >
              Load More
            </button>
          )}
          {showMore && (
            <button
              onClick={() => setShowMore(false)}
              className="border border-[#ddd] rounded-[2rem] px-5 studentGroupBtn hover:bg-slate-500 hover:text-gray-100 p-2 space-y-6"
            >
              Show Less
            </button>
          )}
        </div>
         
           {!isLoading ?( studentData?.map((item) => (
             <div className="	flex flex-wrap justify-start "  onMouseEnter={() => setHoveredCardId(item?._id)}
             onMouseLeave={() => setHoveredCardId(null)}>
             <div
                key={item._id}
                className={`cards-list px-4 max-md:w-full w-1/2 panel ${checkActiveClass(
                  item?.group?.name,
                  "active"
                )}`}
              >
                <div className="card my-2 hover:bg-gray-100 border border-1 border-[#ddd] rounded-[10px]  w-full flex " style={{
    transition: "background-color 0.5s ease-in-out",
  }} >
                  <div className="card-img">
                    <img className="studentCarImg" src={image} alt="" />
                    
                  </div>
                  <div className="card-des w-[100%]  p-3">
                    <h3 className="font-bold capitalize">
                      {item.first_name + " " + item.last_name}
                    </h3>
                    <div className="text-[#777]">
                      <span>12 / 03 / 2023</span> | <span>09:00 AM</span>
                    </div>
                    <div className="flex justify-end	 items-center gap-2 cursor-pointer studentIconCard ">
                      <form onSubmit={handleSubmit()}>
                        {/* <Delete id={item._id} getData={fetchStudentData} /> */}
                      <span >
                      <ViewDetails  id={item._id} rest={item._id === hoveredCardId ? (<span>View</span>) : (<LiaEyeSolid size={25} className="text-gray-600"/>   )} />
                      </span>
                       </form>

                    </div>
                  </div>
                </div>
              </div>
              </div>

            ))): (
              <div className="flex   w-1/2 items-center cards-list ps-0 border border-[#ddd] rounded-[10px] py-0 my-1 overflow-hidden">
                <div className="card-img bg-orange-100 px-2 w-1/4">
                  <div className="animate-pulse w-full h-32"></div>
                </div>
                <div className="card-des w-full p-3">
            
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                </div>
              </div>
            )
      }
      </div>
    </>
  );
};
export default Students;
export const Delete = ({ id, getData }) => {

  const [isLoading, setIsLoading] = React.useState(false);
  const [openModalDelete, setOpenModalDelete] = React.useState(false);
  const toggleModal = () => {
    setOpenModalDelete(!openModalDelete);
  };
  const currentUrl = useCurrentUrl();
  const dispatch = useDispatch();

  const handleDelete = React.useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(deleteItem({ id, currentUrl }));
      if (getData) {
        await getData();
      }
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, getData, id, currentUrl]);
  return (
    <span>
      <MdOutlineDeleteOutline size={25} className="" onClick={toggleModal} />
      <ModalDeleteSection
        openModalDelete={openModalDelete}
        setOpenModalDelete={setOpenModalDelete}
        toggleModal={toggleModal}
        textBtn="Delete"
        modalTitle="Delete Student"
        handleFunction={handleDelete}
        
      >
       
      </ModalDeleteSection>
    </span>
  );
};

export  const ViewDetails = ({ id ,isHovered,rest}) => {

  const [isLoading, setIsLoading] = React.useState(false);
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [studentData,setStudentData]=React.useState([])
  const toggleModal = () => {
    setOpenViewModal(!openViewModal);
  };
  const dispatch = useDispatch();

  const handelView  = React.useCallback(async () => {

    setIsLoading(true);
    try {

      const element = await dispatch(getStudentDataDetails(id));
      setStudentData(element?.payload?.data)
    } finally {
      setIsLoading(false);
    }
  }, [dispatch,  id]);
  React.useEffect(() => {
    if (openViewModal) {
      handelView();
    }
  }, [openViewModal, handelView ]);
  const headers = ['Student Name', 'Email', 'Status', 'Group Name'];

  const studentDataTable = [
    `${studentData?.first_name} ${studentData?.last_name}`,
    studentData?.email,
    studentData?.status,
    studentData?.groupName
  ];
 

  return (
   <>
 <div  className="rounded-2xl  p-2" onClick={toggleModal} > 
 <div className="p-2 inset-0 bg-gray-200 rounded-full shadow-md">

   {rest}
   </div>

 </div>
      <ModalViewSection
        openViewModal={openViewModal}
        setOpenViewModal={setOpenViewModal}
        toggleModal={toggleModal}
        textBtn="Student Details"
        modalTitle="Student"
      >
        <div className="relative overflow-x-auto">
    <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {headers.map((header, index) => (
              <tr key={index}>
                
       <th className="px-4 py-2 text-left  border-2">{     isLoading?(                    <div className="h-3 border-2 bg-gray-200 rounded-full dark:bg-gray-700  w-1/2 mb-2.5"></div>
):header}</th>


            <td className="border px-4 py-2">
                  {isLoading ? (
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mb-2.5"></div>
                  ) : (
                    <p>
                      {header === 'Student Name'
                        ? `${studentData?.first_name} ${studentData?.last_name}`
                        : header === 'Email'
                        ? studentData?.email
                        : header === 'Status'
                        ? studentData?.status
                        : studentData?.group?.name}
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </thead>
        </Table>
        </div>
       
      </ModalViewSection>
    </>
  );
};
