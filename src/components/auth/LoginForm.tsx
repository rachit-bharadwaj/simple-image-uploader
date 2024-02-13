"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// icons
import { TiUser, TiLockClosed } from "react-icons/ti";
import { TbMailFilled } from "react-icons/tb";
import { HiEye, HiEyeOff } from "react-icons/hi";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  //   state variable for data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "email":
        setFormData({ ...formData, email: e.target.value });
        break;
      case "password":
        setFormData({ ...formData, password: e.target.value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ----------------------validation----------------
    // check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return toast.error("Invalid email");
    }

    // create data object
    const data = {
      email: formData.email,
      password: formData.password,
    };

    try {
      // send data to server
      const response = await axios.post("/api/auth/login", data);
      const resData = await response.data;

      if (resData.status === 200) {
        toast.success(resData.message);
        router.push("/");
      } else {
        toast.error(resData.message);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xs flex gap-7 flex-col"
    >
      <ToastContainer />

      <div className="border-b flex gap-2 p-1">
        <TbMailFilled className="text-2xl text-gray-400" />
        <input
          type="email"
          placeholder="Email"
          className="outline-none flex-1 text-lg"
          onChange={handleChange}
          name="email"
        />
      </div>

      <div className="border-b ">
        <div className="flex gap-2 p-1">
          <TiLockClosed className="text-2xl text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="outline-none flex-1 text-lg"
            onChange={handleChange}
            name="password"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {!showPassword ? (
              <HiEye className="text-2xl text-gray-400" />
            ) : (
              <HiEyeOff className="text-2xl text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <button className="bg-[#006bff] text-gray-200 py-2 text-lg rounded-xl mt-5">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
