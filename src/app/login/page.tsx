import Image from "next/image";
import Link from "next/link";

import { LoginForm } from "@/components/auth";

const LoginPage = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center p-3 md:flex-row md:h-screen md:justify-evenly">
      <Image
        src={"/images/it-graphics.jpg"}
        alt="graphics image"
        width={500}
        height={500}
        className="h-52 w-fit md:h-96"
      />

      <div>
        <h1 className="text-4xl font-bold text-[#006bff]">Welcome Back</h1>

        <LoginForm />

        <div className="w-full max-w-xs my-5 flex flex-col gap-3">
          <div className="flex items-center gap-1">
            <hr className="flex-1" /> <p className="text-gray-400">or</p>
            <hr className="flex-1" />
          </div>

          <Link
            href={"/register"}
            className="border-gray-400 border-2 text-center text-gray-500 py-2 text-lg rounded-xl mt-5"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
