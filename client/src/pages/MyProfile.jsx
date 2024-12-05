import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets"; // Ensure you import the assets properly
import userImg from "../assets/user.png";

import axios from "axios";
import { getItem } from "../helper/localStorageManager";
import { Navigate } from "react-router-dom";

const MyProfile = () => {
  {
    (!getItem("accessToken") || !getItem("empToken") || !getItem("adminToken"))&&(
      Navigate("/")
    );
  }
  const [userData, setUserData] = useState({
    name: "",
    image: "", // Ensure profile_pic is defined in the assets file
    email: "",
    phone: "",
    address: "",
    gender: "Male",
  });
  const [userInfo, setUserInfo] = useState(false);
  const accessToken = getItem("accessToken");
  const empToken = getItem("empToken") || getItem("adminToken");
  let respons;

  useEffect(() => {
    const getdata = async () => {
      {
        accessToken &&
          (respons = await axios.post("http://localhost:4000/user/data", {
            accessToken,
          }));
      }
      {
        empToken &&
          (respons = await axios.post("http://localhost:4000/emp/data", {
            empToken,
          }));
      }
      console.log("this is the user data", respons);
      setUserData(respons.data.result);
      setUserInfo(true);
    };
    getdata();
  }, []);

  async function update() {
    {
      accessToken &&
        (console.log("in the updddatres"),
        (respons = await axios.post("http://localhost:4000/user/update", {
          accessToken,
          userData,
        })));
    }
    {
      empToken &&
        (respons = await axios.post("http://localhost:4000/emp/update", {
          empToken,
          userData,
        }));
    }
    console.log("this is the user data", respons);
  }
  const handelImagechange = (e) => {
    const file = e.target.files[0];
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      if (filereader.readyState === FileReader.DONE) {
        setUserData((prev) => ({ ...prev, image: filereader.result }));
      }
    };
  };

  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      {userInfo && (
        <div className="max-w-lg flex items-center flex-col gap-2 text-sm">
          <div>
            {isEdit ? (
              <input
                type="file"
                placeholder="image"
                accept="image/*"
                onChange={handelImagechange}
              />
            ) : (
              <img className="w-36" src={userData.image} alt="" />
            )}
            {isEdit ? (
              <input
                className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
                name="name"
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            ) : (
              <p className="font-medium text-3xl text-neutral-800 mt-4">
                {userData.name}
              </p>
            )}

            <hr className="bg-zinc-400 h-[1px] border-none" />
            <div>
              <p className="text-neutral-500 underline mt-3 ">
                CONTACT INFORMATION
              </p>
              <div className="grid grid-cols-[2fr_3fr] gap-y-2.5 mt-4 text-neutral-700">
                <p className="font-medium">Email id:</p>
                <p className="text-blue-500">{userData.email}</p>
                <p className="font-medium">Phoen:</p>
                {isEdit ? (
                  <input
                    className="bg-gray-100 max-w-52"
                    type="text"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p className=" text-blue-400">{userData.phone}</p>
                )}
                <p className="font-medium">Address:</p>
                {isEdit ? (
                  <p>
                    <input
                      className="bg-gray-50"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                      value={userData.address}
                      type="text"
                      name=""
                      id=""
                    />
                  </p>
                ) : (
                  <p className="text-gray-500 ">{userData.address}</p>
                )}
              </div>
            </div>
            <div>
              <p className="text-neutral-500 underline mt-3 ">
                BASIC INFORMATION
              </p>
            </div>
            <div className="grid grid-cols-[2fr_3fr] gap-y-2.5 mt-4 text-neutral-700">
              <p className="font-medium">Gender:</p>
              {isEdit ? (
                <select
                  className="max-w-20 bg-gray-100"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  value={userData.gender}
                >
                  <option value="Male">Male</option>

                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className="text-gray-400">{userData.gender}</p>
              )}
              <p className="font-medium">Age:</p>

              {isEdit ? (
                <input
                  type="text"
                  className="bg-gray-50"
                  name="age"
                  id="age"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      age: e.target.value,
                    }))
                  }
                />
              ) : (
                <p className="text-gray-400">{userData.age}</p>
              )}
            </div>
            {empToken && (
              <div className="grid grid-cols-[2fr_3fr] gap-y-2.5 mt-4 text-neutral-700">
                <p className="font-medium">About:</p>
                {isEdit ? (
                  <input
                    type="text"
                    name="about"
                    className="bg-gray-50"
                    id="about"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        about: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p className="text-gray-400">{userData.about}</p>
                )}
                <p className="font-medium">Fee:</p>
                {isEdit ? (
                  <input
                    type="text"
                    name="fee"
                    id="fee"
                    className="bg-gray-50"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        fee: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p className="text-gray-400">{userData.fee}</p>
                )}{" "}
                <p className="font-medium">Specialist:</p>
                {isEdit ? (
                  <input
                    type="text"
                    name="specialist"
                    id="specialist"
                    className="bg-gray-50"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        specialist: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p className="text-gray-400">{userData.specialist}</p>
                )}{" "}
                <p className="font-medium">Experience:</p>
                {isEdit ? (
                  <input
                    type="text"
                    name="experience"
                    id="experience"
                    className="bg-gray-50"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        experience: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p className="text-gray-400">{userData.experience}</p>
                )}
              </div>
            )}
          </div>
          <div className="mt-10">
            {isEdit ? (
              <button
                className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-100"
                onClick={() => {
                  update(), setIsEdit(false);
                }}
              >
                Save Information
              </button>
            ) : (
              <button
                className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-100 "
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MyProfile;
