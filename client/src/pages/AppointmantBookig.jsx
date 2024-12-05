import axios from "axios";
import React, { useEffect, useState } from "react";
import { getItem } from "../helper/localStorageManager";
import { Navigate } from "react-router-dom";

const AppointmantBookig = ({ close, id, Time, Date, Day, docId }) => {
  const token = getItem("accessToken");
  const [addpatient, setAddPatient] = useState({
    doctor_name: id,
    patient_name: "",
    problem_description: "",
    address: "",
    Age: "",
    sex: "",
    date: Day,
    time: Time,
    day: Date,
    weight: "",
    docId: docId,
  });
  const [loding, setLoding] = useState(false);
  {
    (!getItem("accessToken") ||
      !getItem("empToken") ||
      !getItem("adminToken")) &&
      Navigate("/");
  }

  async function handulSubmil() {
    if (
      !addpatient.doctor_name ||
      !addpatient.weight ||
      !addpatient.day ||
      !addpatient.date ||
      !addpatient.time ||
      !addpatient.sex ||
      !addpatient.patient_name ||
      !addpatient.problem_description ||
      !addpatient.address ||
      !addpatient.docId ||
      !addpatient.Age
    ) {
      return;
    }

    const data = {
      addpatient,
      token,
    };

    try {
      setLoding(true);
      console.log("this si the data", data);
      const respons = await axios.post(
        "http://localhost:4000/book/appoinmentbooking",
        data
      );
      console.log(respons.data);
      console.log("this is the emp data", respons);
      if (respons.data.status === "ok") {
        setLoding(false);
        close();
      }
    } catch (error) {
      console.log("login error", error);
    }
  }
  return (
    <div className="w-full z-40 flex justify-center items-center">
      <div className="text-white bg-slate-100 border-2 gap-1 items-center flex flex-col   w-96 h-96 ">
        {loding && (
          <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
            <div className="overflow-hidden bg-gray-100 shadow-sm ">
              <div className="marquee-content flex gap-4 items-center animate-marquee">
                <div className="w-[60%] h-1 bg-blue-500 text-xs  text-transparent rounded ">
                  Loding...
                </div>
              </div>
            </div>
          </div>
        )}{" "}
        <div className="flex justify-between w-full ">
          <p className="bg-primary  select-none flex justify-center flex-1 ">
            Assign Doctor to Appointment
          </p>
          <span
            onClick={() => close()}
            className="select-none text-red-600 hover:text-red-700 active:text-red-800 bg-primary text-lg flex-[.07] z-50"
          >
            X
          </span>
        </div>
        <input
          className="border-2  mb-4 w-80 h-10 bg-white border-black   text-black"
          placeholder="Patient Name"
          type="text"
          name="patient_name"
          id=""
          value={addpatient.patient_name}
          onChange={(e) => {
            setAddPatient({ ...addpatient, patient_name: e.target.value });
          }}
        />{" "}
        <input
          className=" border-2 w-80 mb-4 h-10 bg-white border-black text-black"
          placeholder="Age"
          type="text"
          name="age"
          id=""
          value={addpatient.Age}
          onChange={(e) => {
            setAddPatient({ ...addpatient, Age: e.target.value });
          }}
        />{" "}
        <input
          className=" border-2 w-80 mb-4 h-10 bg-white border-black text-black"
          placeholder="SEX"
          type="text"
          name="sex"
          id=""
          value={addpatient.sex}
          onChange={(e) => {
            setAddPatient({ ...addpatient, sex: e.target.value });
          }}
        />
        <input
          className=" border-2 w-80 mb-4 h-10 bg-white border-black text-black"
          placeholder="Weight"
          type="text"
          name="weight"
          id=""
          value={addpatient.weight}
          onChange={(e) => {
            setAddPatient({ ...addpatient, weight: e.target.value });
          }}
        />
        <input
          className=" border-2 w-80 mb-4 h-10 bg-white border-black text-black"
          placeholder="Adress"
          type="text"
          name="address"
          id=""
          value={addpatient.address}
          onChange={(e) => {
            setAddPatient({ ...addpatient, address: e.target.value });
          }}
        />
        <textarea
          className="border-2 resize-none mb-4  w-80 h-20 bg-white border-black   text-black"
          placeholder="Problme Description"
          name="problme_description"
          id="problme_description"
          onChange={(e) => {
            setAddPatient({
              ...addpatient,
              problem_description: e.target.value,
            });
          }}
        />
        <button
          onClick={() => {
            handulSubmil(), setLoding(true);
          }}
          className="bg-primary w-32 mb-4 h-10 flex justify-center items-center   text-white px-8 py-3 rounded-full font-light "
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AppointmantBookig;
