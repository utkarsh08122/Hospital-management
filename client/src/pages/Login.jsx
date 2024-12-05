import React, { useEffect, useState } from "react";
import axios from "axios";
import { getItem, setItem } from "../helper/localStorageManager";
import { ImCross } from "react-icons/im";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loding, setLoding] = useState(false);
  const [userExist, setUserExist] = useState(false);
 

  const signupHandler = async (event) => {
    event.preventDefault();
    if (!name || !email || !password) return;
    const data = {
      name,
      email,
      password,
    };
    setLoding(true);

    try {
      const respons = await axios.post(
        "http://localhost:4000/auth/signup",
        data
      );
      console.log(respons);
      if (respons.data.status === "ok") {
        setLoding(false);
        setState("Login");
      }
      if (respons.data.status === "error") {
        setLoding(false);
        setUserExist(true);
      }
    } catch (error) {
      console.log("signup error", error);
    }
  };
  const loginHandler = async (event) => {
    event.preventDefault();
    if (!email || !password) return;

    const data = {
      email,
      password,
    };
    setLoding(true);

    try {
      const respons = await axios.post(
        "http://localhost:4000/auth/login",

        data
      );
      console.log(respons.data);
      let name;
      if (respons.data.status === "ok") {
        setItem(respons.data.post, `${respons.data.result}`);
        setLoding(false);
        window.location = "frontend/";
      } else {
        alert(respons.data.result);
      }
    } catch (error) {
      console.log("login error", error);
    }
  };
  console.log("state", state);
  return (
    <form className=" min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto item-start p-8 min-w-[340px] sm:min-w-96 border rounded-lg text-zinc-600 text-sm shadow-lg">
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
        )}
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "Sign Up" : "Login"} to book appointment
        </p>
        {state === "Sign Up" && (
          <div className="w-full ">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 w-full p-2 mt-1"
              type="text"
              onChange={(e) => {setName(e.target.value),setUserExist(false)}}
              value={name}
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 w-full p-2 mt-1"
            type="email"
            onChange={(e) => {setEmail(e.target.value),setUserExist(false)}}
            value={email}
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 w-full p-2 mt-1"
            type="password"
            onChange={(e) => {setPassword(e.target.value),setUserExist(false)}}
            value={password}
          />
        </div>
        <button
          onClick={state === "Sign Up" ? signupHandler : loginHandler}
          className="bg-primary text-white w-full p-2 mt-1 rounded-md text-base hover:"
        >
          {" "}
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create an New Account ?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
        {userExist && (
          <p className="text-red-500">
            <ImCross />
            User is already exist
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
