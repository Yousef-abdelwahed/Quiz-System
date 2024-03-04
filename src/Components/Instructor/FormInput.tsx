/** @format */

// FormComponents.jsx
import React, { forwardRef } from "react";

const LabelForm = ({ label, deign }) => {
  return (
    <div
      className={`bg-orange-100 w-40 text-center p-1 rounded-xl border pl-5 border-orange-100 font-medium ps-0 capitalize ${deign} text-sm`}
      style={{ fontWeight: 700 }}
    >
      {label}
    </div>
  );
};

export const FormInput = forwardRef(({ label, ...rest }, ref) => {
  return (
    <div className="py-1">
      <div className="flex rounded-xl border border-gray-300  m-2 overflow-hidden  ">
        <LabelForm label={label} />
        <input
          placeholder="Enter title"
          ref={ref}
          {...rest}
          type="text"
          className={`bg-white border-white rounded-xl pr-2 w-full ps-2`}
        />
      </div>
    </div>
  );
});
const FormInputTextAria = forwardRef(({ label, ...rest }, ref) => {
  return (
    <div className="py-1">
      <div className="flex rounded-md border border-gray-300 m-2">
        <LabelForm label={label} />
        <textarea
          rows={2}
          placeholder="Enter title"
          ref={ref}
          {...rest}
          className="bg-white border-white rounded-xl pr-2 w-full px-2 py-1"
        />
      </div>
    </div>
  );
});
export const FormSelect = forwardRef(({ label, maxNum, ...rest }, ref) => {
  const options = Array.from({ length: maxNum }, (_, index) => index + 1);

  return (
    <div className="py-1">
      <div className="flex  rounded-xl border border-gray-300 overflow-hidden   m-2">
        <div
          className={`text-sm font-medium bg-orange-100 md:w-56 text-center overflow-hidden p-1 rounded-xl border pl-5 border-orange-100 font-medium ps-0 capitalize `}
        // style={{ fontWeight: 700 }}
        >
          {label}
        </div>
        <select
          ref={ref}
          {...rest}
          className="text-black border-white  pr-2 w-1/3 text-center "
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});

const FormDate = forwardRef(({ label, register }, ref) => {
  // console.log(currentDate, currentTime);
  return (
    <div className="pt-3">
      {/* <div className="flex   rounded-xl border border-gray-300  m-2 w-1/2"> */}
      <div className="flex m-2  ">
        <div className="w-full flex justify-between-auto">
          <input
            {...register("schadule", {
              required: "Enter your group name",
            })}
            // defaultValue={currentDate}
            type="date"
            className="bg-white border-white  pr-2 h-full text-xl "
            style={{ width: "auto" }}
          />
          <input
            // defaultValue={currentTime}
            type="time"
            {...register("time", {
              required: "Enter your group name",
            })}
            name="time"
            style={{ marginRight: "10px", width: "auto" }}
            className="bg-white border-white  pr-2 h-full ms-auto text-xl"
          />
        </div>
      </div>
    </div>
  );
});

const FormSelectCategories = forwardRef(
  ({ label, categories, ...rest }, ref) => {
    return (
      <div className="py-1">
        <div className="flex items-center text-sm justify-center rounded-xl border border-gray-300 tex-center m-2">
          <div
            className={`bg-orange-100  w-full text-center overflow-hidden p-1 rounded-xl border pl-5 border-orange-100 font-medium ps-0 capitalize `}
          >
            {label}
          </div>
          <select
            ref={ref}
            {...rest}
            className="m-auto text-center bg-white border-white rounded-xl pr-2 md:w-40 "
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category}
                className="tex-center flex justify-center"
              >
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
);
const FormSelectGroups = () =>
  forwardRef(({ label, groupsCollection, ...rest }, ref) => {
    console.log(groupsCollection);
    return (
      <div className="py-1">
        <div className="flex items-center text-sm justify-center rounded-xl border border-gray-300 tex-center m-2">
          <div
            className={`bg-orange-100  w-full text-center overflow-hidden p-1 rounded-xl border pl-5 border-orange-100 font-medium ps-0 capitalize `}
          >
            {label}
          </div>
          <select
            ref={ref}
            {...rest}
            className="m-auto text-center bg-white border-white rounded-xl pr-2 md:w-40 "
          >
            {groupsCollection?.map((groupName) => (
              <option
                // key={groupName._id + groupName.name}
                value={groupName?._id}
                className="tex-center flex justify-center"
              >
                {groupName?.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  });

const FromSelectInput = forwardRef(
  ({ label, maxNum, defaultValues, ...rest }, ref) => {
    const options = Array.from({ length: maxNum }, (_, index) => index + 1);

    return (
      <>
        {/* <div className="flex  rounded-xl border border-gray-300 overflow-hidden   m-2"> */}
        <div className="flex  leading-loose my-2 justify-between rounded-md border border-gray-300 w-80 m-2 text-xl">
          <div className="bg-orange-100 w-2/3 rounded-md border pl-5 border-orange-100 ">
            {label}
          </div>
          <div className="bg-white w-1/3  border-white rounded-md pr-2 ">
            <select
              ref={ref}
              {...rest}
              className="text-black border-white  pr-2 w-full text-center "
            >
              {options.map((option) => (
                <option key={option} value={defaultValues}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </>
    );
  }
);
const FormComponents = {
  FormInput,
  FormSelect,
  FormDate,
  FormSelectCategories,
  FormInputTextAria,
  FormSelectGroups,
  FromSelectInput,
};

export default FormComponents;
