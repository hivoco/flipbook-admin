import {
  AudioWaveform,
  ClipboardCheck,
  Copy,
  X,
  Upload,
  File,
  ExternalLink,
  Play,
  Pause,
} from "lucide-react";
import React, { useState, useRef } from "react";
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Button,
} from "@headlessui/react";
import { BASE_URL } from "../../../constant";

const GenerateLinkPopup = ({
  setPopUpVisible,
  text,
  setText,
  setGender,
  handleConvertToAudio,
  gender,
  audioSrc,
  handleCopy,
  copied,
  flipbookName,
}) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const options = ["Male", "Female"];

  const handleFileUpload = (file) => {
    if (
      file &&
      (file.type.startsWith("audio/") || file.type.startsWith("video/"))
    ) {
      setUploadedFile(file);
    } else {
      alert("Please upload a valid audio or video file");
    }
  };

  const UploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append("brochureName", flipbookName.trim());
      formData.append("file", uploadedFile);

      const response = await fetch(`${BASE_URL}/brochure/upload-file/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      setFileUrl(data.data.file.url);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const toggleAudioPreview = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="absolute bottom-10 right-4 bg-white rounded-xl shadow-2xl w-96 h-[500px] flex flex-col z-50 border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <AudioWaveform className="w-5 h-5 text-blue-600" />
          Audio Tools
        </h3>
        <Button
          onClick={() => setPopUpVisible(false)}
          className="text-gray-400 hover:text-gray-600 hover:bg-white/60 p-2 rounded-lg transition-all duration-200"
        >
          <X size={18} />
        </Button>
      </div>

      {/* Tab Navigation */}
      <TabGroup className="flex flex-col flex-1 overflow-hidden">
        <TabList className="flex border-b border-gray-100 bg-gray-50">
          <Tab className="flex-1 px-4 py-3 text-sm font-semibold text-gray-600 data-selected:bg-white data-selected:text-blue-700 data-selected:border-b-2 data-selected:border-blue-600 data-hover:bg-gray-100 transition-all duration-200">
            Text to Speech
          </Tab>
          <Tab className="flex-1 px-4 py-3 text-sm font-semibold text-gray-600 data-selected:bg-white data-selected:text-blue-700 data-selected:border-b-2 data-selected:border-blue-600 data-hover:bg-gray-100 transition-all duration-200">
            Upload File
          </Tab>
        </TabList>

        <TabPanels className="flex-1 overflow-y-auto">
          {/* Text to Speech Panel */}
          <TabPanel className="p-4 space-y-4 h-full">
            {!audioSrc && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Audio Text
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter your text to convert to speech..."
                    rows={4}
                    className="w-full px-3 py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Voice Gender
                  </label>
                  <div className="flex gap-2">
                    {options.map((option) => (
                      <Button
                        key={option}
                        onClick={() => setGender(option)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all duration-200 ${
                          gender === option
                            ? "bg-blue-600 text-white border-blue-600 shadow-md"
                            : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleConvertToAudio}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <AudioWaveform size={16} />
                    Convert to Audio
                  </Button>
                  <Button
                    onClick={() => setPopUpVisible(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}

            {audioSrc && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Button
                    onClick={toggleAudioPreview}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200"
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    {isPlaying ? "Pause Preview" : "Preview Audio"}
                  </Button>
                </div>

                <div
                  onClick={() => handleCopy(audioSrc)}
                  className="flex items-center gap-3 cursor-pointer p-3 bg-gradient-to-r from-gray-50 to-blue-50 hover:from-gray-100 hover:to-blue-100 rounded-lg border border-gray-200 transition-all duration-200 group"
                >
                  <p className="text-gray-800 text-sm flex-1 truncate font-medium">
                    {audioSrc}
                  </p>
                  <span className="text-gray-500 group-hover:text-blue-600 transition-colors duration-200">
                    {copied ? <ClipboardCheck size={16} /> : <Copy size={16} />}
                  </span>
                </div>
              </div>
            )}
          </TabPanel>

          {/* Upload File Panel */}
          <TabPanel className="p-4 space-y-4 h-full">
            {!fileUrl ? (
              <>
                {/* File Upload Area */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
                    dragOver
                      ? "border-blue-400 bg-blue-50 scale-105"
                      : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="file"
                    accept="audio/*,video/*"
                    onChange={handleFileInput}
                    className="hidden"
                    id="audio-upload"
                  />
                  <label htmlFor="audio-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Upload size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          Click to upload or drag files here
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Supports audio and video files
                        </p>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Uploaded File Display */}
                {uploadedFile && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg">
                          <File size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {uploadedFile.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {formatFileSize(uploadedFile.size)}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={removeFile}
                        className="text-gray-400 hover:text-red-500 p-1 rounded transition-colors duration-200"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={UploadFile}
                    disabled={!uploadedFile}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-300 disabled:to-gray-400 text-white py-2.5 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg disabled:shadow-none"
                  >
                    <Upload size={16} />
                    Upload File
                  </Button>
                  <Button
                    onClick={() => setPopUpVisible(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={fileUrl}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200"
                  >
                    <ExternalLink size={16} />
                    Preview File
                  </a>
                </div>

                <div
                  onClick={() => handleCopy(fileUrl)}
                  className="flex items-center gap-3 cursor-pointer p-3 bg-gradient-to-r from-gray-50 to-blue-50 hover:from-gray-100 hover:to-blue-100 rounded-lg border border-gray-200 transition-all duration-200 group"
                >
                  <p className="text-gray-800 text-sm flex-1 truncate font-medium">
                    {fileUrl}
                  </p>
                  <span className="text-gray-500 group-hover:text-blue-600 transition-colors duration-200">
                    {copied ? <ClipboardCheck size={16} /> : <Copy size={16} />}
                  </span>
                </div>
              </div>
            )}
          </TabPanel>
        </TabPanels>
      </TabGroup>
      <audio
        ref={audioRef}
        src={audioSrc}
        onEnded={handleAudioEnded}
        className="hidden"
      />
    </div>
  );
};

export default GenerateLinkPopup;
