import React, { useEffect } from "react";
import { getItem } from "../helper/localStorageManager";
import { Navigate } from "react-router-dom";

const Patienthistory = ({ close, patientData }) => {
  {
    (!getItem("accessToken") ||
      !getItem("empToken") ||
      !getItem("adminToken")) &&
      Navigate("/");
  }
  return (
    <div className="fixed top-0 left-0 bg-black/90 w-full h-full flex justify-center">
      <div className="w-3/5 h-full bg-white ">
        <div className="w-full mx-auto h-full p-6 bg-white rounded-lg shadow-lg">
          <div className="w-full flex justify-between">
            <h1 className="text-2xl font-semibold text-center mb-6 flex-1 flex justify-center">
              Patient History
            </h1>
            <span
              onClick={() => {
                close();
              }}
              className="text-red-500 cursor-pointer"
            >
              X
            </span>
          </div>
          <div className="flex flex-col gap-10 h-full">
            <div className="h-10 w-full flex justify-between">
              <span className="">Name: {patientData.patient_name}</span>
              <span className="">Age: {patientData.age}years</span>
            </div>
            <div className="h-10 w-full flex justify-between">
              <span className="">Sex: {patientData.sex}</span>
              <span className="">Weight: {patientData.weight}Kg</span>
            </div>
            <div className="h-10 w-full flex justify-between">
              <span className="">Address: {patientData.address}</span>
              <span className="">
                Date: {patientData.time},{patientData.date} {patientData.day}
              </span>
            </div>
            <div className=" w-full flex flex-col justify-between">
            Problem Description:
              <div className=" w-full">{patientData.problem_description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum illum repellat atque quas deserunt pariatur qui quidem tenetur quisquam voluptate praesentium reprehenderit numquam commodi, alias quia? Soluta molestiae dicta nemo.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patienthistory;
