import React, { useEffect } from "react";
import { getItem } from "../helper/localStorageManager";
import { Navigate } from "react-router-dom";

const Discharge = () => {
  {
    (!getItem("accessToken") ||
      !getItem("empToken") ||
      !getItem("adminToken")) &&
      Navigate("/");
  }
  return (
    <div className="text-white bg-white flex flex-col items-center  w-[90wv] h-[35rem] border-white border-2">
      <div className="text-black bg-slate-100 border-2 gap-1 justify-between flex flex-col flex-wrap  w-full ">
        <table>
          <thead>
            <tr className="flex justify-between flex-row flex-wrap bg-primary  flex-1">
              <th className=" w-32 text-sm">Doctor Name</th>
              <th className=" w-40 text-sm">Name</th>
              <th className=" w-40 text-sm">Email Id</th>
              <th className=" w-20 text-sm">Age</th>
              <th className=" w-20 text-sm">Gender</th>
              <th className=" w-32 text-sm">Probalom</th>
              <th className=" w-32 text-sm">Phone No.</th>
              <th className=" w-96 text-sm">Address</th>
            </tr>
          </thead>
          <tbody className="w-full scroll-auto overflow-scroll h-[30rem] ">
            <tr className=" flex justify-between flex-row flex-wrap rounded-lg flex-1">
              <td className="h-10 flex justify-center items-center w-32 text-sm">
                Doctor Name
              </td>
              <td className="h-10 flex  items-center w-40 text-sm truncate">
                utkarsh
              </td>
              <td className="h-10 flex  items-center w-36 text-sm truncate">
                utkarshuwfwfwfwfewfwefeftkarshsingh@gmail.com
              </td>
              <td className="h-10 flex justify-center items-center w-20 text-sm">
                Age
              </td>
              <td className="h-10 flex justify-center items-center w-20 text-sm">
                Gender
              </td>
              <td className="h-10 flex justify-center items-center w-32 text-sm">
                Probalom
              </td>
              <td className="h-10 flex justify-center items-center w-32 text-sm">
                Phone No.
              </td>
              <td className="h-10 flex justify-center items-center w-96 text-sm truncate">
                Address
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Discharge;
