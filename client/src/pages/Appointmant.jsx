import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

import RelatedDoctor from "../components/RelatedDoctor";
import AppointmantBookig from "./AppointmantBookig";
import { GrCircleInformation } from "react-icons/gr";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { getItem } from "../helper/localStorageManager";

const Appointment = () => {
  {
    (!getItem("accessToken") ||
      !getItem("empToken") ||
      !getItem("adminToken")) &&
      Navigate("/");
  }
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState();
  const [slotTime, setSlotTime] = useState("");
  const [slotDay, setSlotday] = useState("");
  const [slotDate, setSlotdate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  function close() {
    setIsBooking(false);
  }

  const getAvailableSlot = async () => {
    setDocSlot([]);

    // Getting current date
    let today = new Date();
    for (let i = 1; i < 7; i++) {
      // Getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Setting end time with the index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // Setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // Add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        // Increment time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      // Update the state
      setDocSlot((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlot();
    }
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlot);
  }, [docSlot]);

  return (
    docInfo && (
      <div>
        {/* Doctor details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image.url}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 mt-[-80px] sm:mt-0">
            {/* Doctor info name, experience */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}{" "}
              <BsFillPatchCheckFill className="text-[#0000ff] w-5" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            {/* Doctor about */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About
                <GrCircleInformation className="text-lg text-black  " />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1 ">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking slots */}
        <div className=" flex justify-center w-full  items-center flex-col  mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div
            onClick={() => setIsOpen(true)}
            className="flex gap-3 items-center justify-center w-full overflow-x-scroll pl-28 mt-4"
          >
            {docSlot.length > 0 &&
              docSlot.map((item, index) => (
                <div
                  onClick={() => {
                    setSlotIndex(index);
                    setSlotdate(dayOfWeek[item[0].datetime.getDay()]);
                    setSlotday(item[0].datetime.getDate());
                  }}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  {/* {console.log("this sit the slotIndex",slotIndex)} */}
                  <p>{item[0] && dayOfWeek[item[0].datetime.getDay()]}</p>
                  {/* Get the day of the week */}
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                  {/* Get the day of the month */}
                </div>
              ))}
          </div>
        </div>
        {isOpen && (
          <div className="flex   w-full items-center overflow-x-scroll  gap-3 mt-4">
            {/* Slot time rendering */}
          

            {docSlot.length > 0 &&
              docSlot[1].map(
                (item, index) => (
                
                  (
                    <p
                      onClick={() => setSlotTime(item.time)}
                      className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                        item.time === slotTime
                          ? "bg-primary text-white"
                          : "text-gray-400 border border-gray-300"
                      }`}
                      key={index}
                    >
                      {typeof item.time === "string" && item.time.toLowerCase()}
                    </p>
                  )
                )
              )}
          </div>
        )}
        <div className="flex justify-center ">
          <button
            onClick={() => {
              console.log(
                "thi si the booking slot date and time",
                slotDay,
                slotDate,
                slotTime
              );
              setIsBooking(true);
            }}
            className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
            disabled={!slotDate || !slotDay || !slotTime}
          >
            Book an Appointment
          </button>
          {isBooking && (
            <div className="fixed z-10 w-full flex justify-center items-center   bg-black/90 h-full top-0 left-0  ">
              <AppointmantBookig
                close={close}
                id={docInfo.name}
                Day={slotDay}
                Date={slotDate}
                Time={slotTime}
                docId={docId}
              />
            </div>
          )}
        </div>

        {/*---Listing Related Doctors----- */}
        <RelatedDoctor docId={docId} speciality={docInfo.specialist} />
      </div>
    )
  );
};

export default Appointment;
