import React, { useEffect, useState } from "react";
import Patienthistory from "./Patienthistory";
import { getItem } from "../helper/localStorageManager";
import { Navigate } from "react-router-dom";
import axios from "axios";

function AllPatient() {
  const token = getItem("empToken");
  const [id, setId] = useState(null);
  const [patientData, setPatientData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [patient, setPatient] = useState([]);
  function close() {
    setIsOpen(false);
  }
  // function data() {
  //   // creat the map function for filtter the user means patient data
  // }

  useEffect(() => {
    async function getData() {
      const respons = await axios.post(
        "http://localhost:4000/emp/appointment",
        { token }
      );
      if (respons.data.status === "ok") {
        setPatient(respons.data.result);
        console.log(respons.data.result);
      }
    }
    getData();
  }, []);

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
            <tr className="flex  flex-row flex-wrap bg-primary   justify-between flex-1">
              <th className=" w-32 text-sm">Name</th>
              <th className=" w-32 text-sm">Age</th>
              <th className=" w-32 text-sm">Sex</th>
              <th className=" w-32 text-sm">Time</th>
              <th className=" w-32 text-sm">Weight</th>
              <th className=" w-96 text-sm">Probalom</th>
            </tr>
          </thead>
          {patient && (
            <tbody className="w-full scroll-auto overflow-scroll h-[30rem] ">
              {patient.toReversed().map((item) => {
                return (
                  <tr
                    onClick={() => {
                      setPatientData(item);
                    }}
                    className=" flex flex-row flex-wrap justify-between rounded-lg flex-1 cursor-pointer"
                  >
                    <td
                      onClick={() => {
                        setId("userId");
                        setIsOpen(true);
                      }}
                      className="h-10 flex  jb items-center w-32 text-sm truncate"
                    >
                      {item.patient_name}
                    </td>
                    <td className="h-10 flex justify-center items-center w-32 text-sm">
                      {item.age}
                    </td>
                    <td className="h-10 flex justify-center items-center w-32 text-sm">
                      {item.sex}
                    </td>
                    <td className="h-10 flex justify-center items-center w-32 text-sm">
                      {item.time}
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
          )}
        </table>
        {isOpen && (
          <Patienthistory key={id} patientData={patientData} close={close} />
        )}
      </div>
    </div>
  );
}

export default AllPatient;
