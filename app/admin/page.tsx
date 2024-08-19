"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
// import {Input} from "@nextui-org/react";

// Dynamically import the Example component with no SSR
const Example = dynamic(() => import("../../components/Admin/Example"), { ssr: false });

const AdminPage: React.FC = () => {
  const [inputPassword, setInputPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const correctPassword = "kovikkovik";

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (inputPassword === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  return (
    <section className="pb-[80px] pt-[120px]">
    <div className="flex items-center justify-center h-screen p-10">
      {!isAuthenticated ? (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg ">
          <p>Login to Admin Page</p>
          <input
            className="mt-4 bg-gray-50 border w-40 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="password"
            placeholder="Enter password"
            value={inputPassword}
            onChange={handlePasswordChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
          />
          <button 
          className="mt-4 text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSubmit}
          >Submit</button>
        </div>
      ) : (
        <Example placeholder="Enter content here..." />
      )}
    </div>
    </section>
  );
};

export default AdminPage;
