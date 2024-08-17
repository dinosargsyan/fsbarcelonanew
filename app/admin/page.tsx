"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";

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
    <div>
      {!isAuthenticated ? (
        <div>
          <input
            type="password"
            placeholder="Enter password"
            value={inputPassword}
            onChange={handlePasswordChange}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      ) : (
        <Example placeholder="Enter content here..." />
      )}
    </div>
    </section>
  );
};

export default AdminPage;
