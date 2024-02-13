"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

const Uploads = () => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const fetchImages = async () => {
    try {
      const res = await axios.get("/api/images");
      const resData = await res.data;
      setUploadedImages(resData.images);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <section className="p-3">
      <p className="text-2xl my-5 font-bold text-gray-700">Uploaded images</p>

      <div className="flex-wrap flex gap-5 justify-center items-center my-5">
        {uploadedImages.length ? (
          uploadedImages?.map((image: any) => (
            <Image
              key={image._id}
              src={image.image}
              alt="uploaded image"
              width={500}
              height={500}
              className="h-52 w-fit rounded-lg"
            />
          ))
        ) : (
          <p className="text-xl text-gray-500">Fetching images...</p>
        )}
      </div>
    </section>
  );
};

export default Uploads;
