"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import HTMLFlipBook from "react-pageflip";
import YouTube from "react-youtube";
import { X, Play, Pause, Edit3, Trash2 } from "lucide-react";

import useCheckAuthOnRoute from "@/hooks/useCheckAuthOnRoute";
import { useResizeRerender } from "@/hooks/useResizeRerender";

import { BASE_URL, USER_FACING_URL } from "../../../../constant";
import MenuPopup from "@/pages/components/MenuPopup";
import EditPointModal from "@/pages/components/EditPointModal";
import GenerateLinkPopup from "@/pages/components/GenerateLinkPopup";
import BottomMenuBar from "@/pages/components/BottomMenuBar";
import Loading from "@/pages/components/Loading";

const EditFlipbook = () => {
  const isUserLoggedIn = useCheckAuthOnRoute();

  const bookRef = useRef();
  const audioRef = useRef();
  const divRef = useRef();
  const videoRef = useRef();
  const mediaRef = useRef(null);
  const [audioSrc, setAudioSrc] = useState("");
  const [text, setText] = useState("");
  const [gender, setGender] = useState("");
  const [currentCordinate, setCurrentCordinate] = useState();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [displayOverlay, setDisplayOverlay] = useState(false);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [isPdfLandScape, setIsPdfLandScape] = useState(true);

  // Interactive points state
  const [points, setPoints] = useState({});
  const [gotPoints, setGotPoints] = useState([]);
  const [isEditingPoint, setIsEditingPoint] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [copied, setCopied] = useState(false);

  const [flipbookName, setFlipbookName] = useState("");
  const [flipbookImages, setFlipbookImages] = useState([]);

  // New state for gotPoints actions
  const [activeGotPoint, setActiveGotPoint] = useState(null);
  const [playingMediaId, setPlayingMediaId] = useState(null);

  const [clickedImageIndex, setClickedImageIndex] = useState();

  const labelInputRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const [mediaUrl, setMediaUrl] = useState();

  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [currentVideoSrc, setCurrentVideoSrc] = useState("");
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [isYouTubeVideo, setIsYouTubeVideo] = useState(false);
  const [youtubePlayer, setYoutubePlayer] = useState(null);

  const [isLandscape, setIsLandscape] = useState(false);
  const [isPageFlipSoundOn, setIsPageFlipSoundOn] = useState(false);

  useEffect(() => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const name = window.location.pathname.split("/").pop();
    setFlipbookName(name);
  }, []);

  const getFlipbookImages = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/brochure/brochure/${flipbookName}`
      );
      const data = await response.json();
      console.log(data, "getFlipbookImages");

      setFlipbookImages(data?.data?.images);
      setIsLandscape(data?.data?.isLandScape);
      setIsPageFlipSoundOn(data?.data?.pageFlipSound);
    } catch (error) {
      console.error("Error fetching flipbook data:", error);
    }
  };

  useEffect(() => {
    if (flipbookName) {
      getFlipbookImages();
    }
  }, [flipbookName]);

  useEffect(() => {
    if (labelInputRef.current && isEditingPoint) {
      labelInputRef.current.focus();
    }
  }, [isEditingPoint]);

  const onFlip = useCallback(
    (e) => {
      setCurrentPage(e.data);
      setSelectedPoint(null);
      setActiveGotPoint(null); // Close any active gotPoint actions
    },
    [currentAudioIndex]
  );

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 0.1, 0.8));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      divRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleVideoPlayBack = () => {
    if (!videoRef.current) return;

    if (videoIsPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setVideoIsPlaying(!videoIsPlaying);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    if (!audioRef.current || !audioSrc) return;

    audioRef.current.play();
    setIsPlaying(true);
  }, [audioSrc]);

  const handleConvertToAudio = () => {
    if (!text) {
      alert("Please provide text to convert to audio");
      return;
    }

    if (!gender) {
      alert("Please select gender");
      return;
    }
    sendTextGetAudioLink(text, gender);
    setText("");
  };

  const sendTextGetAudioLink = async (text, gender) => {
    try {
      const response = await fetch(`${BASE_URL}/brochure/api/tts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          gender: gender,
          brochureName: flipbookName,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAudioSrc(data.audioUrl);
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };

  const handleCopy = async (string) => {
    try {
      await navigator.clipboard.writeText(string);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyURL = async () => {
    try {
      await navigator.clipboard.writeText(`${USER_FACING_URL}/${flipbookName}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Interactive Points Functions
  const handleImageClick = (e, pageIndex) => {
    console.log("handleImageClick");

    setClickedImageIndex(pageIndex + 1);

    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCurrentCordinate({ x: x, y: y }); // sending this to backend

    const newPoint = {
      id: Date.now(),
      pageIndex,
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
      label: "",
      mediaUrl: "",
    };

    setPoints((prev) => ({
      ...prev,
      [pageIndex]: [...(prev[pageIndex] || []), newPoint],
    }));
    setIsEditingPoint(newPoint.id);
  };

  const isPointFilled = (point) => {
    return (
      point.label ||
      point.audioUrl ||
      point.videoUrl ||
      point.audioFile ||
      point.videoFile
    );
  };

  const handlePointClick = (e, point) => {
    e.stopPropagation();
    if (point.label || point.mediaUrl) {
      setSelectedPoint(selectedPoint === point._id ? null : point._id);
    } else {
      setIsEditingPoint(point._id);
    }
  };

  // New function to handle gotPoint clicks
  const handleGotPointClick = (e, gotPoint) => {
    e.stopPropagation();
    setActiveGotPoint(activeGotPoint === gotPoint._id ? null : gotPoint._id);
    setSelectedPoint(null); // Close any other selected points
  };

  // New function to play media from gotPoint
  const handlePlayMedia = async (gotPoint) => {
    try {
      if (playingMediaId === gotPoint._id) {
        // Stop playing
        if (mediaRef.current) {
          mediaRef.current.pause();
          mediaRef.current.currentTime = 0;
        }
        setPlayingMediaId(null);
        return;
      }

      // Start playing
      setPlayingMediaId(gotPoint._id);

      // Create audio/video element and play
      const isVideo =
        gotPoint.link.includes(".mp4") ||
        gotPoint.link.includes(".webm") ||
        gotPoint.link.includes("video");

      if (isVideo) {
        // Handle video
        if (videoRef.current) {
          videoRef.current.src = gotPoint.link;
          await videoRef.current.play();
        }
      } else {
        // Handle audio
        if (audioRef.current) {
          audioRef.current.src = gotPoint.link;
          await audioRef.current.play();
        }
      }
    } catch (error) {
      console.error("Error playing media:", error);
      alert("Failed to play media. Please check the link.");
      setPlayingMediaId(null);
    }
  };

  // New function to delete gotPoint
  const handleDeleteGotPoint = async (gotPoint) => {
    if (confirm("Are you sure you want to delete this point?")) {
      try {
        await deletePoints(gotPoint._id);
        // Refresh the points after deletion
        await getPoints();
        setActiveGotPoint(null);
      } catch (error) {
        console.error("Error deleting point:", error);
        alert("Failed to delete point.");
      }
    }
  };

  const updatePoint = (pointId, updates) => {
    setPoints((prev) => {
      const newPoints = { ...prev };
      Object.keys(newPoints).forEach((pageIndex) => {
        newPoints[pageIndex] = newPoints[pageIndex].map((point) =>
          point.id === pointId ? { ...point, ...updates } : point
        );
      });
      return newPoints;
    });
  };

  const deletePoint = (pointId) => {
    setPoints((prev) => {
      const newPoints = { ...prev };
      Object.keys(newPoints).forEach((pageIndex) => {
        newPoints[pageIndex] = newPoints[pageIndex].filter(
          (point) => point.id !== pointId
        );
      });
      return newPoints;
    });
    setSelectedPoint(null);
    setIsEditingPoint(null);
  };

  const findPointById = (pointId) => {
    for (const pageIndex in points) {
      const point = points[pageIndex].find((p) => p.id === pointId);
      if (point) return point;
    }
    return null;
  };

  // Global click handler to close popovers
  useEffect(() => {
    const handleClickOutside = (e) => {
      const flipbookContainer = document.querySelector(".flipbook-container");
      if (flipbookContainer && !flipbookContainer.contains(e.target)) {
        setSelectedPoint(null);
        setActiveGotPoint(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const MediaPlayer = ({ point, type }) => {
    const [isMediaPlaying, setIsMediaPlaying] = useState(false);
    const [error, setError] = useState(null);
    const [blobUrl, setBlobUrl] = useState(null);
    const localMediaRef = useRef(null);

    const url = point.mediaUrl;

    useEffect(() => {
      if (file) {
        const newBlob = URL.createObjectURL(file);
        setBlobUrl(newBlob);
        return () => {
          URL.revokeObjectURL(newBlob);
        };
      }
      return;
    }, [file]);

    const source = file ? blobUrl : url;

    const togglePlay = async () => {
      if (!localMediaRef?.current) return;

      try {
        setError(null);
        if (isMediaPlaying) {
          localMediaRef.current.pause();
          setIsMediaPlaying(false);
        } else {
          await localMediaRef.current.play();
          setIsMediaPlaying(true);
        }
      } catch (err) {
        console.error("Media playback error:", err);
        setError("Failed to play media");
        setIsMediaPlaying(false);
      }
    };

    const handleEnded = () => {
      setIsMediaPlaying(false);
    };

    const handleError = (e) => {
      console.error("Media loading error:", e);
      setError("Failed to load media");
      setIsMediaPlaying(false);
    };

    if (!source) return null;

    return (
      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={togglePlay}
          disabled={!!error}
          className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isMediaPlaying ? <Pause size={12} /> : <Play size={12} />}
          Play {type}
        </button>
        {error && <span className="text-red-500 text-xs">{error}</span>}
        {type === "audio" ? (
          <audio
            ref={localMediaRef}
            src={source}
            onEnded={handleEnded}
            onError={handleError}
            className="hidden"
            preload="metadata"
          />
        ) : (
          <video
            ref={localMediaRef}
            src={source}
            onEnded={handleEnded}
            onError={handleError}
            controls={true}
            className="w-full h-auto max-w-xs rounded mt-2"
            preload="metadata"
          />
        )}
      </div>
    );
  };

  const PointPopover = ({ point }) => (
    <div
      className="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-3 min-w-48 z-50"
      style={{
        left: `${point.x}%`,
        top: `${Math.max(0, point.y - 10)}%`,
        transform: "translateX(-50%)",
        maxWidth: "250px",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-800">Point Details</h4>
        <button
          onClick={() => {
            setIsEditingPoint(point.id);
            setSelectedPoint(null);
          }}
          className="text-gray-500 hover:text-gray-700"
        >
          <Edit3 size={14} />
        </button>
      </div>

      {point.label && (
        <div className="mb-2">
          <span className="text-sm font-medium text-gray-600">Label:</span>
          <p className="text-sm text-gray-800">{point.label}</p>
        </div>
      )}

      <div className="space-y-2">
        {point.mediaUrl && <MediaPlayer point={point} type="audio" />}
        {point.mediaUrl && <MediaPlayer point={point} type="video" />}
      </div>
    </div>
  );

  const getPoints = async () => {
    try {
      const res = await fetch(`${BASE_URL}/link/media-links/${flipbookName}`);
      const data = await res.json();
      setGotPoints(data?.data?.sort((a, b) => a.pageNumber - b.pageNumber));
      if (isEditingPoint) {
        deletePoint(isEditingPoint); // Remove from local points state
        setIsEditingPoint(null);
      }
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  useEffect(() => {
    if (!flipbookName) return;
    getPoints();
  }, [flipbookName]);

  async function addPoint() {
    if (!flipbookName || !currentCordinate.x) {
      throw Error("no flipbook name or page number available");
    }

    if (!mediaUrl) {
      alert("add brochureName");
    }

    setSelectedPoint(null);
    setActiveGotPoint(null);

    try {
      const res = await fetch(`${BASE_URL}/link/media-link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brochureName: flipbookName,
          pageNumber: clickedImageIndex,
          link: mediaUrl,
          coordinates: {
            x: currentCordinate.x,
            y: currentCordinate.y,
          },
        }),
      });

      const data = await res.json();
      if (isEditingPoint) {
        deletePoint(isEditingPoint); // Remove from local points state
        setIsEditingPoint(null);
      }
      // removes current saved point to backend

      // setPoints({}); remove all red points filled unfilled both
      await getPoints();
      console.log(data, "added point");
    } catch (err) {
      console.error("Error:", err);
    }
  }

  async function deletePoints(pointId) {
    try {
      const response = await fetch(`${BASE_URL}/link/media-link/${pointId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Delete failed: ${response.status} ${response.statusText}`
        );
      }

      const result = await response.json();
      console.log("Deletion successful:", result);
    } catch (error) {
      console.error("Error deleting media link:", error);
      throw error;
    }
  }

  const isWebsiteLink = (url) => {
    const websitePatterns = [
      /^https?:\/\//i, // HTTP/HTTPS URLs
    ];

    // Check if it's not a media file or YouTube
    const isYoutube = url.includes("youtube.com") || url.includes("youtu.be");
    const videoExtensions = [
      ".mp4",
      ".webm",
      ".avi",
      ".mov",
      ".wmv",
      ".flv",
      ".mkv",
    ];
    const audioExtensions = [
      ".mp3",
      ".wav",
      ".ogg",
      ".m4a",
      ".aac",
      ".flac",
      ".wma",
    ];
    const isVideo = videoExtensions.some((ext) =>
      url.toLowerCase().includes(ext)
    );
    const isAudio = audioExtensions.some((ext) =>
      url.toLowerCase().includes(ext)
    );

    // It's a website link if it starts with http/https but is not YouTube, video, or audio
    return (
      websitePatterns.some((pattern) => pattern.test(url)) &&
      !isYoutube &&
      !isVideo &&
      !isAudio
    );
  };

  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;

    // Handle different YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  // Function to handle media (audio/video/youtube/website) click
  const handleMediaClick = (mediaUrl, event) => {
    // Check if it's a website link
    if (isWebsiteLink(mediaUrl)) {
      window.open(mediaUrl, "_blank", "noopener,noreferrer");
      return;
    }

    // Check if it's a YouTube URL
    const isYoutube =
      mediaUrl.includes("youtube.com") || mediaUrl.includes("youtu.be");

    // Check if it's a regular video file
    const videoExtensions = [
      ".mp4",
      ".webm",
      ".ogg",
      ".avi",
      ".mov",
      ".wmv",
      ".flv",
      ".mkv",
    ];
    const isVideo = videoExtensions.some((ext) =>
      mediaUrl.toLowerCase().includes(ext)
    );

    if (isYoutube || isVideo) {
      // Handle video - position popup near the clicked button
      const rect = event.target.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;

      setPopupPosition({
        x: rect.right + scrollLeft + 10, // 10px to the right of button
        y: rect.top + scrollTop,
      });

      setCurrentVideoSrc(mediaUrl);
      setIsYouTubeVideo(isYoutube);
      setShowVideoPopup(true);

      // Pause any playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      // Handle audio
      setAudioSrc(mediaUrl);
      setShowVideoPopup(false);
    }
  };

  // Close video popup
  const closeVideoPopup = () => {
    setShowVideoPopup(false);
    setCurrentVideoSrc("");
    setIsYouTubeVideo(false);

    // Pause regular video
    if (videoRef.current) {
      videoRef.current.pause();
      setVideoIsPlaying(false);
    }

    // Pause YouTube video
    if (youtubePlayer) {
      youtubePlayer.pauseVideo();
      setVideoIsPlaying(false);
    }
  };

  async function updateValues(endpoint) {
    try {
      const response = await fetch(
        `${BASE_URL}/brochure/brochure/${flipbookName}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            [endpoint]:
              endpoint.toLowerCase() === "isLandScape".toLowerCase()
                ? !isLandscape
                : !isPageFlipSoundOn,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      getFlipbookImages();
      return data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  function displayPageNumInBar(pageNum) {
    const total = flipbookImages.length;
    if (isPdfLandScape || window.innerWidth < 640)
      return `${pageNum + 1} / ${total}`;

    if (pageNum === 0 || pageNum + 1 === total) {
      return `${pageNum + 1}/${total}`;
    }

    return `${pageNum + 1}-${pageNum + 2}/${total}`;
  }

  const reRender = useResizeRerender();
  if (!isUserLoggedIn) {
    return null;
  }

  return (
    <div className="h-svh  w-full flex flex-col overflow-hidden">
      <div className="relative w-full flex-1 max-w-6xl mx-auto">
        <div ref={divRef} className="relative h-full  flex  flex-col ">
          <div className="flex-1 flex items-center justify-center `">
            <div className="relative transition-transform duration-300 ease-out w-full h-full flex items-center  overflow-hidden">
              {flipbookImages.length > 0 && gotPoints.length >= 0 ? (
                <HTMLFlipBook
                  key={reRender}
                  size="stretch"
                  height={
                    width < 640
                      ? (width - 32) * 1.4
                      : isPdfLandScape
                      ? height
                      : 560
                  }
                  minHeight={
                    width < 640 ? width * 1.4 : isPdfLandScape ? height : 420
                  }
                  maxHeight={
                    width < 640
                      ? height - 200
                      : isPdfLandScape
                      ? height
                      : height - 70
                  }
                  width={
                    width < 640
                      ? width - 32
                      : isPdfLandScape
                      ? width * 0.9 * 0.5
                      : 400
                  }
                  minWidth={
                    width < 640
                      ? width
                      : isPdfLandScape
                      ? width * 0.8 * 0.5
                      : 300
                  }
                  maxWidth={
                    width < 640
                      ? width - 16
                      : isPdfLandScape
                      ? width * 0.5
                      : (height - 70) / 1.4
                  }
                  mobileScrollSupport={true}
                  onFlip={onFlip}
                  flippingTime={500}
                  ref={bookRef}
                  usePortrait={false}
                  startPage={0}
                  autoSize={true}
                  swipeDistance={50}
                  useMouseEvents={!(window.innerWidth > 1000)}
                  // useMouseEvents={true}
                  drawShadow={true}
                  maxShadowOpacity={0.5}
                  // showCover={window.innerWidth > 1000 && !isPdfLandScape}
                  showCover={true}
                  // show cover not looking good in single image /landscape view
                  style={{
                    // stacked page animation as well as shadow
                    boxShadow: isPdfLandScape
                      ? ""
                      : currentPage === 0
                      ? ""
                      : `15px 0px 0px 0px #7A7A7A66,10px 0px 0px 0px #7A7A7A80, 5px 0px 0px 0px #7A7A7A99,2px 0px 0px 0px #7A7A7AB2,
                     0px 2px 2px 0px #00000033,-2px 0px 2px 0px #00000033, 0px -2px 2px 0px #0000001A`,
                    // with last one : "30px 0px 0px 0px #7A7A7A1A,25px 0px 0px 0px #7A7A7A33,20px 0px 0px 0px #7A7A7A4D,15px 0px 0px 0px #7A7A7A66,10px 0px 0px 0px #7A7A7A80, 5px 0px 0px 0px #7A7A7A99,2px 0px 0px 0px #7A7A7AB2,-4px 0px 4px 0px #0000004D",
                    // "0px 2px 2px 0px #00000033,-2px 0px 2px 0px #00000033,0px -2px 2px 0px #0000001A",  outline shadow potrait
                  }}
                  renderOnlyPageLengthChange={false}
                  // style={{ boxShadow: "-20px 0 30px rgba(0, 0, 0, 0.3)" }}
                  className={`
                  rounded-sm  flibook-container relative select-none 

                  ${
                    isPdfLandScape
                      ? "!h-[95svh] min-h-[90svh] !max-h-[99svh]"
                      : // : "w-full h-auto max-w-full max-h-full"
                        // "!h-[95svh] min-h-[90svh] !max-h-svh"
                        `!max-h-full !h-auto 
                        }`
                  }
                  ${
                    !isPdfLandScape &&
                    window.innerWidth > 640 &&
                    currentPage !== 0
                      ? "gradient-bg"
                      : ""
                  }

                  ${
                    isPdfLandScape && !isFullscreen && window.innerWidth > 1000
                      ? "gradient-bg"
                      : ""
                  }
                  `}
                >
                  {flipbookImages?.map((imageSrc, index) => (
                    <div
                      key={index}
                      className={`relative bg-white overflow-hidden h-full w-full self-center  justify-center  items-center  
                      ${
                        index === 0 && !isPdfLandScape
                          ? " lg:right-1/2 lg:-translate-x-1/2"
                          : ""
                      }
                      ${isPdfLandScape ? "w-auto  " : "w-full"}
                      `}
                    >
                      {displayOverlay && (
                        <div className="absolute  z-40 pointer-events-none w-screen h-screen top-0 left-0 bg-black/70 " />
                      )}

                      <Image
                        width={500}
                        height={500}
                        priority={true}
                        onClick={(e) => handleImageClick(e, index)}
                        // shadow for landscape pdf
                        style={{
                          boxShadow: isPdfLandScape
                            ? //stack right
                              `
                            15px 0px 0px 0px #7A7A7A66,10px 0px 0px 0px #7A7A7A80, 5px 0px 0px 0px #7A7A7A99,2px 0px 0px 0px #7A7A7AB2,
                            0px 2px 2px 0px #00000033,-2px 0px 2px 0px #00000033, 0px -2px 2px 0px #0000001A,

                            0 25px 40px rgba(0, 0, 0, 0.4),
                            0 35px 60px rgba(0, 0, 0, 0.2),
                            0 8px 15px rgba(0, 0, 0, 0.3),
                            0 0 0 1px rgba(255, 255, 255, 0.1)`
                            : //shadow around the image
                              // old "30px 0px 0px 0px #7A7A7A1A,25px 0px 0px 0px #7A7A7A33,20px 0px 0px 0px #7A7A7A4D,15px 0px 0px 0px #7A7A7A66,10px 0px 0px 0px #7A7A7A80, 5px 0px 0px 0px #7A7A7A99,2px 0px 0px 0px #7A7A7AB2,-4px 0px 4px 0px #0000004D"
                              ``,
                        }}
                        src={imageSrc}
                        alt={"image " + index}
                        // className={`
                        //   ${
                        //
                        //       ? "mx-auto !w-auto !h-full object-contain"
                        //       : "object-contain h-full w-full sm:h-[95vh] sm:w-auto"
                        //   }
                        //   `}

                        className={`object-contain h-full relative cursor-crosshair 
                        ${
                          isPdfLandScape
                            ? "w-full mxauto justify-self-center"
                            : "w-auto  lg:h-[90vh] lg:w-auto"
                        }
                        `}
                      />

                      {/* Render gotPoints with action buttons */}
                      {gotPoints
                        .filter((obj) => obj.pageNumber === index + 1)
                        .map((obj, idx) => {
                          return (
                            <div className="" key={idx}>
                              <div
                                className={`absolute inset-0 w-4 h-4 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 border-2 border-white shadow-lg hover:scale-110 transition-transform ${
                                  playingMediaId === obj._id
                                    ? "bg-green-400"
                                    : "!bg-blue-400"
                                }`}
                                style={{
                                  left: `${obj.coordinates.x}%`,
                                  top: `${obj.coordinates.y}%`,
                                  zIndex: 10,
                                }}
                                onClick={(e) => handleGotPointClick(e, obj)}
                              />

                              {/* Action buttons overlay */}
                              {activeGotPoint === obj._id && (
                                <div
                                  className="absolute flex gap-1 transform -translate-x-1/2 -translate-y-full"
                                  style={{
                                    left: `${obj.coordinates.x}%`,
                                    top: `${obj.coordinates.y}%`,
                                    zIndex: 20,
                                    marginTop: "-8px",
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {/* Play/Pause button */}
                                  <button
                                    // onClick={() => handlePlayMedia(obj)}
                                    onClick={(e) =>
                                      handleMediaClick(obj?.link, e)
                                    }
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform ${
                                      playingMediaId === obj._id
                                        ? "bg-red-500"
                                        : "bg-green-500"
                                    }`}
                                    title={
                                      playingMediaId === obj._id
                                        ? "Stop Media"
                                        : "Play Media"
                                    }
                                  >
                                    {playingMediaId === obj._id ? (
                                      <Pause size={14} />
                                    ) : (
                                      <Play size={14} />
                                    )}
                                  </button>

                                  {/* Delete button */}
                                  <button
                                    onClick={() => handleDeleteGotPoint(obj)}
                                    className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform hover:bg-red-600"
                                    title="Delete Point"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  ))}
                </HTMLFlipBook>
              ) : (
                <Loading />
              )}
            </div>
          </div>

          <BottomMenuBar
            isFullscreen={isFullscreen}
            displayPageNumInBar={displayPageNumInBar}
            currentPage={currentPage}
            isPlaying={isPlaying}
            toggleAudio={toggleAudio}
            flipbookName={flipbookName}
            audioRef={audioRef}
            bookRef={bookRef}
            toggleFullscreen={toggleFullscreen}
            setPopUpVisible={setPopUpVisible}
            setMenuOpen={setMenuOpen}
          />
        </div>
      </div>

      {popUpVisible && (
        <GenerateLinkPopup
          setPopUpVisible={setPopUpVisible}
          text={text}
          setText={setText}
          setGender={setGender}
          handleConvertToAudio={handleConvertToAudio}
          gender={gender}
          audioSrc={audioSrc}
          handleCopy={handleCopy}
          copied={copied}
          flipbookName={flipbookName}
        />
      )}

      {/* Edit Modal */}
      {isEditingPoint && (
        <EditPointModal
          point={findPointById(isEditingPoint)}
          mediaUrl={mediaUrl}
          setMediaUrl={setMediaUrl}
          updatePoint={updatePoint}
          addPoint={addPoint}
          setIsEditingPoint={setIsEditingPoint}
          deletePoint={deletePoint}
          flipbookName={flipbookName}
          clickedImageIndex={clickedImageIndex}
          currentCordinate={currentCordinate}
          getPoints={getPoints}
        />
      )}

      <audio ref={audioRef} src={audioSrc ? audioSrc : null}></audio>
      {/* <video ref={videoRef} className="hidden"></video> */}

      {showVideoPopup && (
        <>
          {/* Backdrop to close popup when clicking outside */}
          <div className="fixed inset-0 z-40" onClick={closeVideoPopup} />
          <div
            className="fixed z-50 bg-black rounded-lg shadow-2xl border-2 border-gray-600"
            style={{
              left: ` ${Math.min(popupPosition.x, window.innerWidth - 320)}px`, // Ensure it doesn't go off screen
              top: `${Math.min(popupPosition.y, window.innerHeight - 240)}px`,
              width: "300px",
              height: "220px",
            }}
          >
            <button
              onClick={closeVideoPopup}
              className="absolute top-1 right-1 z-10 bg-red-600 hover:bg-red-700 text-white rounded-full p-1"
              aria-label="Close video"
            >
              <X size={16} />
            </button>

            {isYouTubeVideo ? (
              <YouTube
                videoId={getYouTubeVideoId(currentVideoSrc)}
                opts={{
                  height: "200",
                  width: "290",
                  playerVars: {
                    autoplay: 1,
                    modestbranding: 1,
                    rel: 0,
                  },
                }}
                onReady={(event) => {
                  setYoutubePlayer(event.target);
                  setVideoIsPlaying(true);
                }}
                onPlay={() => setVideoIsPlaying(true)}
                onPause={() => setVideoIsPlaying(false)}
                onEnd={() => setVideoIsPlaying(false)}
                className="rounded-lg overflow-hidden"
                style={{ padding: "10px" }}
              />
            ) : (
              <video
                ref={videoRef}
                src={currentVideoSrc}
                controls
                autoPlay
                className="w-full h-full rounded-lg"
                onPlay={() => setVideoIsPlaying(true)}
                onPause={() => setVideoIsPlaying(false)}
                onEnded={() => setVideoIsPlaying(false)}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </>
      )}

      {menuOpen && (
        <MenuPopup
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          updateValues={updateValues}
          isLandscape={isLandscape}
          isPageFlipSoundOn={isPageFlipSoundOn}
        />
      )}
    </div>
  );
};

export default EditFlipbook;
