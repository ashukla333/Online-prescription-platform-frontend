import React, { useState } from "react";
import MainLogo from "./MainLogo";
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { FaUser, FaUserMd } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  return (
    <header className="flex justify-between items-center px-5 md:px-10 py-4 bg-white shadow-md border-b-2">
      <div className="cursor-pointer " onClick={()=>router.push('/')}>
        <MainLogo  className={"text-sm"} icon={"!text-[20px]"} />
      </div>

      <div className="flex items-center gap-10">
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <button
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300"
                onClick={() => router.push("/doctor/signIn")}
              >
                <FaUserMd className="text-white text-xl" />
                <AiOutlineLogin className="text-white text-xl" />
                <span>Doctor Sign In</span>
              </button>
              <button
                className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300"
                onClick={() => router.push("/doctor/signUp")}
              >
                <FaUserMd className="text-white text-xl" />
                <AiOutlineUserAdd className="text-white text-xl" />
                <span>Doctor Sign Up</span>
              </button>
            </>
          ) : (
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300"
              onClick={() => setIsLoggedIn(false)}
            >
              Logout
            </button>
          )}
        </div>

        <div>
          <button
            className="flex items-center space-x-2 bg-yellow-900 hover:bg-yellow-600 text-white px-4 py-2 rounded transition duration-300"
            onClick={() => router.push("/patient/signUp")}
          >
            <FaUser className="text-white text-xl" />
            <span>Patient Sign Up</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
