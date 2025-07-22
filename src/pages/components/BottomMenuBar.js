import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Eye,
  Link,
  Share2,
  Volume2,
  VolumeX,
} from "lucide-react";
import React, { useState } from "react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { USER_FACING_URL } from "../../../constant";
import { handleShare } from "@/utilities/editFlipbook.helper";

const BottomMenuBar = ({
  isFullscreen,
  displayPageNumInBar,
  currentPage,
  isPlaying,
  toggleAudio,
  popUpVisible,
  flipbookName,
  audioRef,
  bookRef,
  toggleFullscreen,
  setPopUpVisible,
  setMenuOpen,
}) => {
    
  const [visible, setVisible] = useState(false);
  return (
    <div
      onClick={() => {
        console.log("div clicked");
      }}
      onTouchEnd={() => setVisible((prev) => !prev)}
      onMouseOver={() => setVisible(true)}
      onMouseOut={() => setVisible(false)}
      onMouseMove={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
        boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
        background: `linear-gradient(90deg,
              #38B5F9 0%,
              #48BFFA 11%,
              #52C3F7 22%,
              #55C1F4 33%,
              #53BAF0 44%,
              #4CAFED 55%,
              #44A3E9 66%,
              #3D99E8 77%,
              #388FE6 88%,
              #3388E2 100%
              )`,
      }}
      className="bg-black/80  max-w-3xl  lg:max-w-5xl mx-auto   lg:max-h-[10vh] rounded-full absolute z-60 left-0 right-0 bottom-1 sm:bottom-0 md:bottom-1  flex items-center justify-center sm:justify-center px-4 sm:px-4 py-2 gap-4 sm:gap-8 flex-shrink-0 
            "
    >
      <div className="border-2 bg-white/10 border-white rounded-full shadow-[0px_2px_2px_0px_#00000040] py-1 px-3 flex justify-between gap-6 backdrop-blur-lg">
        <button
          onClick={() => {
            audioRef.current.pause();
            bookRef.current.pageFlip().flipPrev("top");
            // bookRef.current.pageFlip().turnToPrevPage();
          }}
          className="text-white p-1 md:p-1.5 size-9 flex justify-center items-center  rounded-full border-2 border-white shadow-[0px_2px_2px_0px_#00000040]"
          aria-label="Previous page"
        >
          <ChevronLeft size={14} />
        </button>

        <div className="font-Inter font-medium flex justify-center items-center gap-2">
          <div className="text-white min-w-24 whitespace-nowrap">
            Page {displayPageNumInBar(currentPage)}{" "}
          </div>
        </div>

        <button
          onClick={() => {
            audioRef.current.pause();
            bookRef.current.pageFlip().flipNext();
          }}
          className="text-white p-1 md:p-1.5 size-9 flex justify-center items-center rounded-full border-2 border-white shadow-[0px_2px_2px_0px_#00000040]"
          aria-label="Next page"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      <button
        onClick={(e) => {
          toggleFullscreen(e);
          e.stopPropagation();
          e.preventDefault();
          console.log("button clicked");
        }}
        className="text-white p-1 md:p-2 rounded-full border-2 border-white shadow-[0px_2px_2px_0px_#00000040]"
        aria-label="Full screen"
      >
        {isFullscreen ? (
          <MdFullscreenExit size={20} />
        ) : (
          <MdFullscreen size={20} />
        )}
      </button>

      <button
        className="p-1 md:p-2 rounded-full border-2 border-white shadow-[0px_2px_2px_0px_#00000040]"
        aria-label={isPlaying ? "Mute Audio" : "Play Audio"}
        onClick={toggleAudio}
      >
        {isPlaying ? (
          <Volume2 color="white" size={20} />
        ) : (
          <VolumeX color="white" size={20} />
        )}
      </button>

      <button
        onClick={() => setPopUpVisible((prev) => !prev)}
        className="text-white p-1 md:p-3 hover:scale-105"
      >
        <Link size={28} color="white" />
      </button>

      <a
        href={`${USER_FACING_URL}/${flipbookName}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          className="p-1 md:p-3 hover:scale-105"
          aria-label="preview flipbook in new page"
        >
          <Eye size={28} color="white" />
        </button>
      </a>

      <button
        onClick={() => handleShare(`${USER_FACING_URL}/${flipbookName}`)}
        className="text-white p-1 md:p-3 hover:scale-105"
      >
        <Share2 size={28} />
      </button>

      <button
        className="p-1 md:p-3 hover:scale-105"
        onClick={() => {
          setMenuOpen((prev) => !prev);
        }}
        aria-label="More options"
      >
        <EllipsisVertical size={28} color="white" />
      </button>
    </div>
  );
};

export default BottomMenuBar;
