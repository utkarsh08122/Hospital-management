import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointmant from "./pages/Appointmant";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Admin from "./pages/Admin";
import Mortuary from "./pages/Mortuary";
import Discharge from "./pages/Discharge";
import AppointmantBookig from "./pages/AppointmantBookig";
import AllPatient from "./pages/AllPatient";
import AllAppointment from "./pages/AllAppointment";
import { getItem } from "./helper/localStorageManager";

const App = () => {
  return (
    <div className="mx-4 sm:max-[10%]:">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />}/>
       
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/discharge" element={<Discharge />} />
        <Route path="/AllPatient" element={<AllPatient />} />
        <Route path="/myappointment" element={<AllAppointment />} />
        <Route path="/mortuary" element={<Mortuary />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment" element={<Appointmant />} />
        <Route path="/appointment/:docId" element={<Appointmant />} />
        <Route path="/appointmentbooking" element={<AppointmantBookig />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
