import React, { useState, useRef, useEffect, Profiler } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Play,
  Save,
  X,
  Upload,
  BookOpen,
  ArrowRight,
  Loader2,
  Search,
} from "lucide-react";
import Image from "next/image";
import { BASE_URL, employeeArray } from "../../../constant";
import Link from "next/link";
import useCheckAuthOnRoute from "@/hooks/useCheckAuthOnRoute";
import SearchFlipbook from "../components/SearchFlipbook";
import SkeletonGrid from "../components/SkeletonGrid";

const Admin = () => {
  const [flipbooks, setFlipbooks] = useState([]);

  const [editingFlipbook, setEditingFlipbook] = useState(null);
  // const [playingFlipbook, setPlayingFlipbook] = useState(null);
  // const [currentPage, setCurrentPage] = useState(0);
  const [newFlipbookName, setNewFlipbookName] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const fileInputRef = useRef(null);
  // const [playInterval, setPlayInterval] = useState(null);
  const [popUpVisible, setPopUpVisible] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const isUserLoggedIn = useCheckAuthOnRoute();

  const handleCreateNew = () => {
    setPopUpVisible(true);
    setNewFlipbookName("");
    setUploadedImages([]);
  };

  const FlipbookCard = ({ flipbook, id }) => (
    <Link href={`/edit-flipbook/${flipbook?.name}`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
        <div className="relative h-36  bg-gray-100">
          {flipbook?.images?.length > 0 ? (
            <Image
              src={flipbook?.images[0]}
              alt={flipbook?.displayName || "Flipbook Image"}
              className="w-full h-full object-cover"
              width={600}
              height={600}
              fetchPriority={id < 6 ? "high" : ""}
              priority={id < 6}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <BookOpen size={48} />
            </div>
          )}
          <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm">
            {flipbook?.images?.length} pages
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 truncate">
            {flipbook?.displayName}
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Created: {flipbook?.createdAt}
          </p>
        </div>
      </div>
    </Link>
  );

  const handleFileChange = async (e) => {
    if (e.target.files) {
      // Convert FileList to an array of File objects
      const filesArray = Array.from(e.target.files).filter((file) =>
        file.type.startsWith("image/")
      );
      setSelectedFiles(filesArray);
      setMessage(filesArray.length + " files Selected");
    }
  };

  const handleImageUpload = async () => {
    if (!newFlipbookName) {
      setMessage("Please enter a name for the flipbook.");
      return;
    }

    if (selectedFiles.length === 0) {
      setMessage("Please select at least one image.");
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("displayName", newFlipbookName.trim());
      formData.append("personName", selectedEmployee.trim());

      selectedFiles.forEach((file, idx) => {
        formData.append("images", file);
      });

      const response = await fetch(`${BASE_URL}/brochure/upload-brochure/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      setMessage("Upload successful");
      setPopUpVisible(false);
      getAllBrocchures();
      setPopUpVisible(false);
      console.log("Server response:", data);
      setSelectedFiles([]);
    } catch (err) {
      console.error(err);
      setMessage(err.message || "An error occurred while uploading.");
    } finally {
      setUploading(false);
    }
  };

  const getAllBrocchures = async () => {
    const res = await fetch(`${BASE_URL}/brochure/brochures`);
    const data = await res.json();
    setFlipbooks(data?.data?.brochures);
    console.log(data, "data");
  };

  useEffect(() => {
    getAllBrocchures();
  }, []);

  if (!isUserLoggedIn) {
    return null;
  }

  console.log(newFlipbookName);

  function onRender(
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime
  ) {
    console.log(id, phase, actualDuration, baseDuration, startTime, commitTime);
    // Aggregate or log render timings...
  }

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8 relative">
        <div>
          <div className="flex justify-between items-center mb-10 px-20">
            <h2 className="text-4xl font-bold text-gray-800 mb-2 drop-shadow-lg">
              Flipbook Creator
            </h2>

            {/* <SearchFlipbook /> */}
            <button
              onClick={handleCreateNew}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <Plus size={20} />
              Create New Flipbook
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-20">
            {flipbooks?.map((flipbook, id) => (
             id<10? <FlipbookCard id={id} key={flipbook?._id} flipbook={flipbook}/>  :null 
            ))}
          </div>

          {flipbooks.length == 0 && <SkeletonGrid />}
        </div>

        {popUpVisible && (
          <div className="absolute top-20 w-sm max-w-1/3 right-3 bg-gray-100 rounded-xl shadow-2xl p-5">
            <div className="flex justify-between gap-5 items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Create New Flipbook
              </h2>
              <button
                onClick={() => {
                  setPopUpVisible(false);
                }}
                className="text-white px-3 py-2 bg-red-500 shadow-md  hover:bg-red-700 flex items-center justify-center
                 rounded-lg font-semibold transition-all duration-300 ease-in-out hover:shadow-red-500/25 hover:scale-110
                "
              >
                <X size={28} />
              </button>
            </div>

            <div className="space-y-2">
              <input
                autoFocus="true"
                type="text"
                required
                value={newFlipbookName}
                onChange={(e) => setNewFlipbookName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800  outline-none  transition-all"
                placeholder="Enter flipbook name..."
              />

              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 capitalize   outline-none transition-all"
              >
                <option value="" disabled>
                  Select employee
                </option>
                {employeeArray.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>

              <div>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-outline-blue-500 hover:border-blue-500 cursor-pointer transition-colors"
                >
                  <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Click to upload images</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Select multiple images at once
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {selectedFiles.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1 text-center">
                    {selectedFiles.length} files selected
                  </p>
                )}
              </div>

              {uploadedImages.length > 0 && (
                <div>{uploadedImages.length} images added</div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={handleImageUpload}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Save size={20} />
                  {editingFlipbook
                    ? "Update Flipbook"
                    : uploading
                    ? "Uploading..."
                    : "Add Brochure"}

                  {uploading && <Loader2 size={20} className="animate-spin" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Play View */}
        {/* {currentView === "play" && playingFlipbook && (
          <div className="bg-white rounded-xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {playingFlipbook.name}
              </h2>
              <button
                onClick={handleStopPlay}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <X size={20} />
                Stop
              </button>
            </div>

            <div className="text-center">
              <div className="relative inline-block">
                <Image
                  src={playingFlipbook.images[currentPage]}
                  alt={`Page ${currentPage + 1}`}
                  className="max-w-full max-h-96 rounded-lg shadow-lg"
                  width={600}
                  height={600}
                  priority={true}
                />
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded">
                  Page {currentPage + 1} of {playingFlipbook.images.length}
                </div>
              </div>

              <div className="mt-4 flex justify-center gap-2">
                {playingFlipbook.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentPage ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Admin;
