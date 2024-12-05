import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { getItem, removeItem } from "../helper/localStorageManager";
import userImg from "../assets/user.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowmenu] = useState(false);
  const [token, setToken] = useState(false);
  const [emp, setEmp] = useState(false);
  const [isOpenMortuary, setIsOpenMortuary] = useState(false);
  const [isOpenDischarge, setIsOpenDischarge] = useState(false);
  const [isPatient, setIsPatient] = useState(false);
  const [appointment, setAppointment] = useState(false);
  useEffect(() => {
    {
      getItem("accessToken") || getItem("empToken") || getItem("adminToken")
        ? setToken(true)
        : setToken(false);
    }
    {
      getItem("adminToken")
        ? (setIsOpenMortuary(true), setIsOpenDischarge(true), setEmp(true))
        : (setIsOpenMortuary(false), setIsOpenDischarge(false), setEmp(false));
    }
    {
      getItem("empToken") ? setIsPatient(true) : setIsPatient(false);
    }
    {
      getItem("accessToken") ? setAppointment(true) : setAppointment(false);
    }
  }, []);

  return (
    <div className="flex items-center justify-between text-sm  border-b border-b-gray-400">
      {/* Logo */}
      <div className="flex w-44">
      <img
        onClick={() => navigate("/")}
        className="w-16 cursor-pointer h-16"
        src={assets.logo}
        alt="Prescripto Logo"
      />
      <p className="w-full text-2xl items-center flex justify-center cursor-pointer h-16">CARE 4U</p>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden py-4 md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/doctors">
          <li className="py-1">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/about">
          <li className="py-1">About</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/contact">
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      {/* Profile Dropdown */}
      <div className="flex items-center gap-4">
        {isOpenDischarge && (
          <NavLink
            to="/discharge"
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Discharge
          </NavLink>
        )}
        {isOpenMortuary && (
          <NavLink
            to="/mortuary"
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Mortuary
          </NavLink>
        )}
        {emp && (
          <NavLink
            to="/admin"
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Empoly
          </NavLink>
        )}
        {isPatient && (
          <NavLink
            to="/allpatient"
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Patient
          </NavLink>
        )}
        {appointment && (
          <NavLink
            to="/myappointment"
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Appointment
          </NavLink>
        )}

        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userImg} alt="Profile" />
            <img
              className="w-2.5"
              src={assets.dropdown_icon}
              alt="Dropdown icon"
            />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointment
                </p>
                <p
                  onClick={() => {
                    getItem("accessToken");
                    setToken(false);
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Button */}
        <img
          onClick={() => setShowmenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="Menu icon"
        />

        {/* Mobile Menu */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-300 ease-in-out`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="Logo" />
            <img
              className="w-7 cursor-pointer"
              onClick={() => setShowmenu(false)}
              src={assets.cross_icon}
              alt="Close menu"
            />
          </div>

          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowmenu(false)} to="/">
              <p className="px-4 py-2 rounded inline-block">Home</p>
            </NavLink>
            <NavLink onClick={() => setShowmenu(false)} to="/doctors">
              <p className="px-4 py-2 rounded inline-block">All Doctors</p>
            </NavLink>
            <NavLink onClick={() => setShowmenu(false)} to="/about">
              <p className="px-4 py-2 rounded inline-block">About</p>
            </NavLink>
            <NavLink onClick={() => setShowmenu(false)} to="/contact">
              <p className="px-4 py-2 rounded inline-block">Contact</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
