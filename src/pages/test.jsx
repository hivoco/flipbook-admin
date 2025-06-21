import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExternalLink, Mail, Play, Volume1 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import React from "react";

const Test = () => {
  // .pulse {
  //   animation: pulse-animation 2s infinite;
  // }

  return (
    <div className="w-full h-screen bg-blue-700 flex justify-around items-center gap-10 ">
      {/* <div
        className={` bg-red-600   shadow-lg w-15 h-15 animate-pulse rounded-full z-50 opacity-100 flex items-center justify-center text-white `}
        // className=""
      >
        <FontAwesomeIcon size="30" className="" icon={faYoutube} beatFade />
      </div> */}

      <div
        className={` bg-green-600 hover:bg-green-700   shadow-lg size-15 animate-pulse rounded-full z-50 opacity-100 flex items-center justify-center text-white `}
        // className=""
      >
        <FaWhatsapp size={30} />
      </div>
      {/* <div
        className={` bg-red-700 hover:bg-red-800   shadow-lg size-15 animate-pulse rounded-full z-50 opacity-100 flex items-center justify-center text-white `}
        // className=""
      >
        <Mail size={30} />
      </div> */}
      <div
        className={` bg-green-500 hover:bg-green-600   shadow-lg size-15 animate-pulse rounded-full z-50 opacity-100 flex items-center justify-center text-white `}
        // className=""
      >
        <ExternalLink size={30} />
      </div>
      {/* <div
        className={`bg-blue-300 hover:bg-blue-600 shadow-lg size-15 animate-pulse rounded-full z-50 opacity-100 flex items-center justify-center text-white `}
        // className=""
      >
        <Volume1 size={30} />
      </div> */}
    </div>
  );
};

export default Test;
