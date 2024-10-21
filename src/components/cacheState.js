import React from 'react';
import SideBar from "@/components/nav";

const LoadingOrError = ({ data, error, children }) => {
  if (!data && !error) {
    return (
      <div className="flex flex-col md:flex-row h-screen">
        <SideBar />
        <div className="flex-1 flex flex-col p-8 overflow-x-auto">
          <h2 className="text-center text-2xl font-bold mb-8 uppercase text-gray-800">
            Loading data...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col md:flex-row h-screen">
        <SideBar />
        <div className="flex-1 flex flex-col p-8 overflow-x-auto">
          <h2 className="text-center text-2xl font-bold mb-8 uppercase text-gray-800">
            Error loading data.
          </h2>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingOrError;
