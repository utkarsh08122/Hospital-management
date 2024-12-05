import React, { useEffect, useState } from "react";
import axios from "axios";
import { getItem } from "../helper/localStorageManager";
import { Navigate } from "react-router-dom";

function AllAppointment() {
  const [appointment, setAppointment] = useState([]);

  {
    (!getItem("accessToken") ||
      !getItem("empToken") ||
      !getItem("adminToken")) &&
      Navigate("/");
  }
  useEffect(() => {
    const token =
      getItem("accessToken") || getItem("empToken") || getItem("adminToken");
    async function appointment() {
      let respons;
      console.log("this is the token", token);
      {
        getItem("accessToken") &&
          ((respons = await axios.post(
            "http://localhost:4000/user/appointment",
            { token }
          )),
          setAppointment(respons.data.result));
        console.log("this is he data ap", respons.data);
      }
      {
        getItem("empToken") &&
          ((respons = await axios.post(
            "http://localhost:4000/emp/appointment",
            { token }
          )),
          setAppointment(respons.data));
      }
      {
        getItem("adminToken") &&
          ((respons = await axios.post(
            "http://localhost:4000/emp/appointment",
            { token }
          )),
          setAppointment(respons.data));
      }
    }
    appointment();
  }, []);

  return (
    <div className="text-white bg-white flex flex-col items-center  w-[90wv] h-[35rem] border-white border-2">
      <div className="text-black bg-slate-100 border-2 gap-1 justify-between flex flex-col flex-wrap  w-full ">
        <table>
          <thead>
            <tr className="flex  flex-row flex-wrap bg-primary   justify-between flex-1">
              <th className=" w-32 text-sm">Doctor</th>
              <th className=" w-32 text-sm">Name</th>
              <th className=" w-32 text-sm">Age</th>
              <th className=" w-32 text-sm">Sex</th>
              <th className=" w-32 text-sm">Day</th>
              <th className=" w-32 text-sm">Time</th>
              <th className=" w-32 text-sm">Weight</th>
              <th className=" w-96 text-sm">Probalom</th>
            </tr>
          </thead>
          <tbody className="w-full scroll-auto overflow-scroll h-[30rem] ">
            {appointment &&
              appointment.toReversed().map((item) => {
                return (
                  <tr className=" flex flex-row flex-wrap justify-between rounded-lg flex-1 cursor-pointer">
                    <td className="h-10 flex  jb items-center w-32 text-sm truncate">
                      {item.doctor_name}
                    </td>
                    <td className="h-10 flex  jb items-center w-32 text-sm truncate">
                      {item.patient_name}
                    </td>
                    <td className="h-10 flex justify-center items-center w-32 text-sm">
                      {item.age}
                    </td>
                    <td className="h-10 flex justify-center items-center w-32 text-sm">
                      {item.sex}
                    </td>

                    <td className="h-10 flex justify-center items-center w-32 text-sm">
                      {item.day}
                    </td>
                    <td className="h-10 flex justify-center items-center w-32 text-sm">
                      {item.time},{item.date}
                    </td>
                    <td className="h-10 flex justify-center items-center w-32 text-sm">
                      {item.weight}
                    </td>
                    <td className="h-10 flex  items-center w-96 text-sm truncate">
                      {item.problem_description}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllAppointment;
