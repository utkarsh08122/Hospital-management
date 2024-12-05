import axios from "axios";
import React, { useEffect, useState } from "react";
import AddEmp from "./AddEmp";
import { getItem } from "../helper/localStorageManager";
import { Navigate } from "react-router-dom";
import AllDocAppointment from "./AllDocAppointment";

function Admin() {
  {
    (!getItem("accessToken") ||
      !getItem("empToken") ||
      !getItem("adminToken")) &&
      Navigate("/");
  }
  const [addEmp, setAddEmp] = useState(false);
  const [allApoiment, setAllApoiment] = useState(false);
  const [Parmision, setParmision] = useState(false);
  const [inPatient, setInPatient] = useState(false);
  const [opem, setOpen] = useState(false);
  const [allEmp, setAllEmp] = useState();

  function close() {
    setAddEmp(false);
    setAllApoiment(false);
  }

  useEffect(() => {
    const getData = async () => {
      const respons = await axios.get("http://localhost:4000/emp/all");
      console.log("this is the user ", respons);
      if (respons.data.status === "ok") {
        setAllEmp(respons.data.result);
      }
    };
    getData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex-1 ">
        <table className="flex-1 flex flex-col border-2">
          <thead>
            <tr className="flex justify-between flex-row  bg-primary  flex-1">
              {/* <th className=" w-20 flex items-center text-sm  ">Doctor</th> */}
              <th className=" w-32 flex items-center text-sm">Name</th>
              <th className=" w-32 flex items-center text-sm">Email Id</th>
              <th className=" w-20 flex items-center text-sm">Specialist</th>
              <th className=" w-20 flex items-center text-sm"> Experience</th>
              <th className=" w-14 flex items-center text-sm">Age</th>
              <th className=" w-32 flex items-center text-sm">Phone No.</th>
              <th className=" w-96 flex items-center text-sm">Address</th>
              {/* {getItem("adminToken") && (
                <th className=" w-16 flex items-center text-sm ">Action</th>
              )} */}
            </tr>
          </thead>

          <tbody className="w-full  flex flex-col scroll-auto overflow-scroll h-[26rem] ">
            {allEmp &&
              allEmp.map((item) => {
                return (
                  <tr className="h-14 flex justify-between flex-row flex-1">
                    {/* <td className="h-14 w-20 flex items-center text-sm  ">
                      {item.name}
                    </td> */}
                    <td className="h-14 w-32 flex items-center text-sm truncate">
                      {item.name}
                    </td>
                    <td className="h-14 w-32 flex items-center text-sm truncate">
                      {item.email}
                    </td>
                    <td className="h-14 w-20 flex items-center text-sm">
                      {item.specialist}
                    </td>
                    <td className="h-16 w-20 flex items-center  text-sm">
                      {item.experience}
                    </td>
                    <td className="h-16 w-14 flex items-center text-sm">
                      {item.age}
                    </td>
                    <td className="h-14 w-32 flex items-center text-sm">
                      {item.phone_No}
                    </td>
                    <td className="h-14 w-96 flex items-center text-sm truncate">
                      {item.address}
                    </td>
                    {/* {getItem("adminToken") && (
                      <td className="h-14 w-16 flex items-center text-sm">
                        <button className="bg-primary w-full items-center justify-center flex  text-white px-4 py-2 rounded-full font-light cursor-pointer truncate ">
                          Delete
                        </button>
                      </td>
                    )} */}
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="flex-1 mt-2">
          <div className="flex justify-end flex-row flex-wrap  gap-2 flex-1 cursor-pointer">
            <button
              onClick={() => setInPatient(true)}
              className="bg-primary  text-white px-8 py-3 rounded-full font-light cursor-pointer  "
            >
              InPatient
            </button>{" "}
            <button
              onClick={() => setAddEmp(true)}
              className="bg-primary  text-white px-8 py-3 rounded-full font-light cursor-pointer  "
            >
              Add Emp
            </button>{" "}
            <button
              onClick={() => setAllApoiment(true)}
              className="bg-primary  text-white px-8 py-3 rounded-full font-light  cursor-pointer"
            >
              All Apoiment
            </button>{" "}
            {/* <button
              onClick={() => setParmision(true)}
              className="bg-primary  text-white px-8 py-3 rounded-full font-light cursor-pointer "
            >
              Parmision
            </button>{" "} */}
          </div>
        </div>
      </div>
      {inPatient && (
        <div className="fixed w-full flex justify-center items-center   bg-black/90 h-full top-0 left-0 ">
          <div className="text-white bg-white flex flex-col items-center  w-[90wv] h-[35rem] border-white border-2">
            <div className="flex ">
              <p className="bg-primary w-[38rem] flex justify-center ">
                All Apoiment{" "}
              </p>
              <p
                onClick={() => {
                  setInPatient(false);
                }}
                className="text-red-600 fixed right-4 cursor-pointer"
              >
                X
              </p>
            </div>
            <div className="text-black bg-slate-100 border-2 gap-1 justify-between flex flex-col flex-wrap  w-[90wv] ">
              <table>
                <thead>
                  <tr className="flex justify-between flex-row flex-wrap bg-primary  flex-1">
                    <th className=" w-32 text-sm">First Name</th>
                    <th className=" w-32 text-sm">Last Name</th>
                    <th className=" w-40 text-sm">Email Id</th>
                    <th className=" w-20 text-sm">Age</th>
                    <th className=" w-20 text-sm">Gender</th>
                    <th className=" w-32 text-sm">Blood Group</th>
                    <th className=" w-32 text-sm">Phone No.</th>
                    <th className=" w-96 text-sm">Address</th>
                    <th className=" w-32 text-sm">Action</th>
                  </tr>
                </thead>
                <tbody className="w-full scroll-auto overflow-scroll h-[30rem] ">
                  <tr className=" flex justify-between flex-row flex-wrap rounded-lg flex-1">
                    <td className="h-10 flex  items-center w-32 text-sm truncate">
                      utkarsh
                    </td>
                    <td className="h-10 flex  items-center w-32 text-sm truncate">
                      Last Name
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
                      Blood Group
                    </td>
                    <td className="h-10 flex justify-center items-center w-32 text-sm">
                      Phone No.
                    </td>
                    <td className="h-10 flex justify-center items-center w-96 text-sm truncate">
                      Address
                    </td>
                    <td className="h-10 flex justify-center items-center w-32 text-sm">
                      <button className="bg-primary  text-white px-4 py-2 rounded-full font-light cursor-pointer ">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {addEmp && <AddEmp close={close} />}
      {allApoiment && <AllDocAppointment  close={close} />}
      {/* {Parmision && (
        <div className="fixed w-full flex justify-center items-center   bg-black/90 h-full top-0 left-0 ">
          <div className="text-white bg-white flex flex-col items-center  w-[90wv] h-[35rem] border-white border-2">
            <div className="flex ">
              <p className="bg-primary w-[38rem] flex justify-center ">
                All Empolys{" "}
              </p>
              <p
                onClick={() => {
                  setParmision(false);
                }}
                className="text-red-600 fixed right-4 cursor-pointer"
              >
                X
              </p>
            </div>
            <div className="text-black bg-slate-100 border-2 gap-1 justify-between flex flex-col flex-wrap  w-[90wv] ">
              <table>
                <thead>
                  <tr className="flex justify-between flex-row flex-wrap bg-primary  flex-1">
                    <th className=" w-32 text-sm">First Name</th>
                    <th className=" w-32 text-sm">Last Name</th>
                    <th className=" w-40 text-sm">Email Id</th>
                    <th className=" w-20 text-sm">Age</th>
                    <th className=" w-20 text-sm">Gender</th>
                    <th className=" w-32 text-sm">Status</th>
                    <th className=" w-32 text-sm">Phone No.</th>
                    <th className=" w-96 text-sm">Address</th>
                    <th className=" w-32 text-sm">Action</th>
                  </tr>
                </thead>
                <tbody className="w-full scroll-auto overflow-scroll h-[30rem] ">
                  <tr className=" flex justify-between flex-row flex-wrap rounded-lg flex-1">
                    <td className="h-10 flex  items-center w-32 text-sm truncate">
                      utkarsh
                    </td>
                    <td className="h-10 flex  items-center w-32 text-sm truncate">
                      Last Name
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
                      Doctor
                    </td>
                    <td className="h-10 flex justify-center items-center w-32 text-sm">
                      Phone No.
                    </td>
                    <td className="h-10 flex justify-center items-center w-96 text-sm truncate">
                      Address
                    </td>
                    <td className="h-10 flex justify-center items-center w-32 text-sm">
                      <button className="bg-primary  text-white px-4 py-2 rounded-full font-light cursor-pointer ">
                        Submit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )} */}
      {opem && alert("Add to InPatient", (window.location = "/#/admin"))}
    </div>
  );
}
export default Admin;
