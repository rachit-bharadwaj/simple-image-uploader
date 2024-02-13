"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// icons
import { TiUser, TiLockClosed } from "react-icons/ti";
import { TbMailFilled } from "react-icons/tb";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { BsFillFileEarmarkLockFill } from "react-icons/bs";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [invalidPassword, setInvalidPassword] = useState(false);

  //   state variable for data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvalidPassword(false);

    switch (e.target.name) {
      case "fullName":
        setFormData({ ...formData, fullName: e.target.value });
        break;
      case "email":
        setFormData({ ...formData, email: e.target.value });
        break;
      case "password":
        setFormData({ ...formData, password: e.target.value });
        break;
      case "confirmPassword":
        setFormData({ ...formData, confirmPassword: e.target.value });
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

    // check if password is at least 8 characters, contains a number and a special character, one uppercase and one lowercase
    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setInvalidPassword(true);
      return toast.error("Invalid password");
    }

    // check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    // create data object
    const data = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
    };

    // send data to server
    const response = await axios.post("/api/auth/register", data);
    const resData = await response.data;

    if (resData.status === 201) {
      toast.success(resData.message);
      router.push("/login");
    } else {
      toast.error(resData.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xs flex gap-7 flex-col"
    >
      <ToastContainer />
      <div className="border-b flex gap-2 p-1">
        <TiUser className="text-2xl text-gray-400" />
        <input
          type="text"
          placeholder="Full Name"
          className="outline-none flex-1 text-lg"
          onChange={handleChange}
          name="fullName"
        />
      </div>

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
        {invalidPassword && (
          <p className="text-red-400 text-sm">
            Password must be at least 8 characters, contains a number and a
            special character, one uppercase and one lowercase
          </p>
        )}
      </div>

      <div className="border-b flex gap-2 p-1">
        <BsFillFileEarmarkLockFill className="text-2xl text-gray-400" />
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          className="outline-none flex-1 text-lg"
          onChange={handleChange}
          name="confirmPassword"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {!showConfirmPassword ? (
            <HiEye className="text-2xl text-gray-400" />
          ) : (
            <HiEyeOff className="text-2xl text-gray-400" />
          )}
        </button>
      </div>

      <button className="bg-[#006bff] text-gray-200 py-2 text-lg rounded-xl mt-5">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
