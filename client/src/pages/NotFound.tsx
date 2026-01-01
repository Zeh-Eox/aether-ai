import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="flex flex-col items-center justify-center text-sm max-md:px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
          404 Not Found
        </h1>
        <div className="h-px w-80 rounded bg-gradient-to-r from-gray-400 to-gray-800 my-5 md:my-7"></div>
        <p className="md:text-xl text-gray-400 max-w-lg text-center">
          The page you are looking for does not exist or has been moved.
        </p>
        <button
          onClick={() =>
            window.history.length > 1 ? navigate(-1) : navigate("/")
          }
          className="group flex items-center gap-1 bg-white hover:bg-gray-200 px-7 py-2.5 text-gray-800 rounded-full mt-10 font-medium active:scale-95 transition-all"
        >
          Go Back
          <svg
            className="group-hover:translate-x-0.5 transition"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.583 11h12.833m0 0L11 4.584M17.416 11 11 17.417"
              stroke="#1E1E1E"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
