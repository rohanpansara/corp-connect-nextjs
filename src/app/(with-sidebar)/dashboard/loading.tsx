// app/dashboard/loading.tsx
"use client"

import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-mainBackground">
      <TailSpin 
        height="80" 
        width="80" 
        radius="9"
        color="#4fa94d" 
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default Loading;
