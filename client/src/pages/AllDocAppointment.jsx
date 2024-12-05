import React, { useEffect, useState } from "react";
import { getItem } from "../helper/localStorageManager";
import { Navigate } from "react-router-dom";
import axios from "axios";

function AllDocAppointment({ close }) {
  {
    (!getItem("accessToken") ||
      !getItem("empToken") ||
      !getItem("adminToken")) &&
      Navigate("/");
  }
  const [data, setData] = useState();
  useEffect(() => {
    async function handulSubmil() {
      try {
        const respons = await axios.post(
          "http://localhost:4000/book/allappoinment"
        );
        if (respons.data.status === "ok") {
          setData(respons.data.result);
        }
      } catch (error) {
        console.log("login error", error);
      }
    }
    handulSubmil();
  }, []);
  return (
    <div className="fixed z-10 w-full flex justify-center items-center   bg-black/90 h-full top-0 left-0 ">
      <div className="text-white bg-white flex flex-col items-center  w-[90wv] h-[35rem] border-white border-2">
        <div className="flex ">
          <p className="bg-primary w-[38rem] flex justify-center ">
            All Apoiment{" "}
          </p>
          <p
            onClick={close}
            className="text-red-600 fixed right-4 cursor-pointer"
          >
            X
          </p>
        </div>
        <div className="text-black bg-slate-100 border-2 gap-1 justify-between flex flex-col flex-wrap  w-[90wv] ">
          <table>
            <thead>
              <tr className="flex justify-between flex-row flex-wrap bg-primary  flex-1">
                <th className=" w-32 text-sm">doctor</th>
                <th className=" w-32 text-sm">Name</th>
                <th className=" w-40 text-sm">Email Id</th>
                <th className=" w-20 text-sm">Age</th>
                <th className=" w-20 text-sm">Gender</th>
                <th className=" w-32 text-sm">Blood Group</th>
                <th className=" w-32 text-sm">Phone No.</th>
                <th className=" w-96 text-sm">Address</th>
                <th className=" w-32 text-sm">Action</th>
              </tr>
            </thead>
            {data && (
              <tbody className="w-full scroll-auto overflow-scroll h-[30rem] ">
                {data.map((item) => {
                  console.log("this is the data of the patient", item);
                  return (
                    <tr className=" flex justify-between flex-row flex-wrap rounded-lg flex-1">
                      <td
                        onClick={() => {
                          setOpen(true);
                        }}
                        className="cursor-pointer h-10 flex  items-center w-32 text-sm truncate"
                      >
                        docotor
                      </td>
                      <td className="h-10 flex  items-center w-32 text-sm truncate">
                        {item.patient_name}
                      </td>
                      <td className="h-10 flex  items-center w-36 text-sm truncate">
                        {item.email}
                      </td>
                      <td className="h-10 flex justify-center items-center w-20 text-sm">
                        {item.age}
                      </td>
                      <td className="h-10 flex justify-center items-center w-20 text-sm">
                        {item.sex}
                      </td>
                      <td className="h-10 flex justify-center items-center w-32 text-sm">
                        Blood Group
                      </td>
                      <td className="h-10 flex justify-center items-center w-32 text-sm">
                        Phone No.
                      </td>
                      <td className="h-10 flex justify-center items-center w-96 text-sm truncate">
                        {item.address}
                      </td>
                      <td className="h-10 flex justify-center items-center w-32 text-sm">
                        <button className="bg-primary  text-white px-4 py-2 rounded-full font-light cursor-pointer ">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllDocAppointment;
