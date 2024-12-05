import axios from "axios";
import React, { useEffect, useState } from "react";
import { getItem } from "../helper/localStorageManager";
import { Navigate } from "react-router-dom";

const AddEmp = ({ close }) => {
  {
    (!getItem("accessToken") ||
      !getItem("empToken") ||
      !getItem("adminToken")) &&
      Navigate("/");
  }
  const [addEmp, setAddEmp] = useState({
    name: "",
    email: "",
    specialist: "",
    address: "",
    phone_No: "",
    Age: "",
    experience: "",
    password: "",
    post: "",
    fee: "",
    about: "",
    degree: "",
    image: "",
  });
  const [loding, setLoding] = useState(false);

  async function handulSubmil() {
    if (
      !addEmp.name ||
      !addEmp.email ||
      !addEmp.specialist ||
      !addEmp.address ||
      !addEmp.phone_No ||
      !addEmp.Age ||
      !addEmp.experience ||
      !addEmp.password ||
      !addEmp.post ||
      !addEmp.fee ||
      !addEmp.about ||
      !addEmp.image ||
      !addEmp.degree
    ) {
      console.log("not complete", addEmp);
      return;
    }

    try {
      setLoding(true);
      const respons = await axios.post(
        "http://localhost:4000/emp/login",
        addEmp
      );
      console.log(respons.data);
      console.log("this is the emp data", respons);
      if (respons.data.status === "ok") {
        setLoding(false);
      }
    } catch (error) {
      console.log("login error", error);
    }
  }
  const handelImagechange = (e) => {
    const file = e.target.files[0];
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      if (filereader.readyState === FileReader.DONE) {
        setAddEmp((prev) => ({ ...prev, image: filereader.result }));
      }
    };
  };

  // useEffect(()=>{
  //   async function getEmp(){
  // const respons = await axios.post("http://localhost:4000/emp/userdata")
  //   }
  // })

  return (
    <div className="fixed z-10 w-full flex justify-center items-center   bg-black/90 h-full top-0 left-0 ">
      <div className="text-white bg-white flex flex-col items-center   w-[40rem] h-[35rem] border-white border-2">
        {loding && (
          <div className="w-[38rem] mb-2 bg-gray-200 rounded-full h-1 dark:bg-gray-700">
            <div className="overflow-hidden bg-gray-100 shadow-sm ">
              <div className="marquee-content flex gap-4 items-center animate-marquee">
                <div className="w-[60%] h-1 bg-blue-500 text-xs  text-transparent rounded ">
                  Loding...
                </div>
              </div>
            </div>
            {/* <div className={`bg-blue-600 h-1 rounded-full w-[10%]`}></div> */}
          </div>
        )}

        <div className="flex ">
          <p className="bg-primary w-[38rem] flex justify-center  flex-1">
            Registor Emp{" "}
          </p>
          <p
            onClick={close}
            className=" text-red-400 bg-primary select-none text-lg flex-[0.06]"
          >
            {" "}
            X
          </p>
        </div>
        <div className="text-white bg-slate-100 border-2 gap-1 justify-between flex flex-row flex-wrap  w-[38rem] h-[34rem] ">
          <input
            type="file"
            placeholder="image"
            accept="image/*"
            onChange={handelImagechange}
          />
          <input
            className="border-2  w-64 h-10 bg-white border-black   text-black"
            placeholder="Name"
            type="text"
            name="name"
            id=""
            value={addEmp.name}
            onChange={(e) => {
              setAddEmp({ ...addEmp, name: e.target.value });
            }}
          />{" "}
          <input
            className=" border-2 w-64 h-10 bg-white border-black text-black"
            placeholder="Email Id"
            type="text"
            name="email"
            id=""
            value={addEmp.email}
            onChange={(e) => {
              setAddEmp({ ...addEmp, email: e.target.value });
            }}
          />{" "}
          <input
            className=" border-2 w-64 h-10 bg-white border-black text-black"
            placeholder="Specialist"
            type="text"
            name="specialist"
            id=""
            value={addEmp.specialist}
            onChange={(e) => {
              setAddEmp({ ...addEmp, specialist: e.target.value });
            }}
          />{" "}
          <input
            className=" border-2 w-64 h-10 bg-white border-black text-black"
            placeholder="Experience"
            type="text"
            name="experience"
            id=""
            value={addEmp.experience}
            onChange={(e) => {
              setAddEmp({ ...addEmp, experience: e.target.value });
            }}
          />{" "}
          <input
            className=" border-2 w-64 h-10 bg-white border-black text-black"
            placeholder="Age"
            type="text"
            name="age"
            id=""
            value={addEmp.Age}
            onChange={(e) => {
              setAddEmp({ ...addEmp, Age: e.target.value });
            }}
          />{" "}
          <input
            className=" border-2 w-64 h-10 bg-white border-black text-black"
            placeholder="Phone No."
            type="text"
            name="phone_No"
            id=""
            value={addEmp.phone_No}
            onChange={(e) => {
              setAddEmp({ ...addEmp, phone_No: e.target.value });
            }}
          />{" "}
          <input
            className=" border-2 w-64 h-10 bg-white border-black text-black"
            placeholder="Address"
            type="text"
            name="address"
            id=""
            value={addEmp.address}
            onChange={(e) => {
              setAddEmp({ ...addEmp, address: e.target.value });
            }}
          />
          <input
            className=" border-2 w-64 h-10 bg-white border-black text-black"
            placeholder="pasword"
            type="password"
            name="image"
            id=""
            value={addEmp.password}
            onChange={(e) => {
              setAddEmp({ ...addEmp, password: e.target.value });
            }}
          />
          <input
            className=" border-2 w-64 h-10 bg-white border-black text-black"
            placeholder="Post"
            type="text"
            name="post"
            id=""
            value={addEmp.post}
            onChange={(e) => {
              setAddEmp({ ...addEmp, post: e.target.value });
            }}
          />
          <input
            className=" border-2 w-64 h-10 bg-white border-black text-black"
            placeholder="Fee"
            type="text"
            name="fee"
            id=""
            value={addEmp.fee}
            onChange={(e) => {
              setAddEmp({ ...addEmp, fee: e.target.value });
            }}
          />
          <input
            className=" border-2 w-64 h-10 bg-white border-black text-black"
            placeholder="degree"
            type="text"
            name="degree"
            id="degree"
            value={addEmp.degree}
            onChange={(e) => {
              setAddEmp({ ...addEmp, degree: e.target.value });
            }}
          />
          <textarea
            className=" border-2 w-64 h-20 resize-none   bg-white border-black text-black"
            placeholder="About"
            name="about"
            id="about"
            onChange={(e) => {
              setAddPatient({
                ...addEmp,
                about: e.target.value,
              });
            }}
          />
          <button
            onClick={handulSubmil}
            className="bg-primary w-32  h-10 flex justify-center items-center   text-white px-8 py-3 rounded-full font-light "
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmp;
