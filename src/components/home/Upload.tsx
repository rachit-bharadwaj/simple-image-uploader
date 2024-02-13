"use client";

import { useState } from "react";
import axios from "axios";

// icons
import { TbPhotoUp } from "react-icons/tb";
import Image from "next/image";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Upload = () => {
  const [imageURL, setImageURL] = useState("");

  const handleInput = (e: any) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageURL(reader.result as string);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  //   upload the image on the server
  const uploadImage = async () => {
    try {
      const res = await axios.post("/api/images", {
        image: imageURL,
      });

      const resData = await res.data;

      if (resData.status === 201) {
        toast.success(resData.message);
        window.location.reload();
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <section className="w-full max-w-md mx-auto px-10 my-10 flex flex-col gap-5">
      <ToastContainer />
      <div>
        {imageURL ? (
          <Image
            src={imageURL}
            alt="uploaded image"
            width={500}
            height={500}
            className="rounded-xl w-full h-fit"
          />
        ) : (
          <button className="h-44 w-full shadow rounded-xl">
            <label
              htmlFor="image-upload"
              className="text-gray-400 cursor-pointer w-full h-full flex flex-col gap-3 items-center justify-center"
            >
              <TbPhotoUp className="text-4xl text-gray-400" />
              Click here to upload image
            </label>
          </button>
        )}

        <input
          type="file"
          name="image-upload"
          accept="image/*"
          id="image-upload"
          hidden
          onChange={handleInput}
        />
      </div>

      <button
        disabled={!imageURL}
        onClick={uploadImage}
        className={
          !imageURL
            ? "bg-gray-300 text-gray-400 font-semibold text-lg rounded-xl py-2 px-10 cursor-not-allowed"
            : "bg-green-500  text-gray-100 font-semibold text-lg rounded-xl py-2 px-10"
        }
      >
        Upload
      </button>
    </section>
  );
};

export default Upload;
