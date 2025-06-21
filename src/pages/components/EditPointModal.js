import { Link2, Loader2, Save, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../../../constant";

const EditPointModal = ({
  point,
  mediaUrl,
  setMediaUrl,
  updatePoint,
  addPoint,
  setIsEditingPoint,
  deletePoint,
  flipbookName,
  clickedImageIndex,
  currentCordinate,
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState([]);
  const fileInputRef = useRef(null);

  const saveChanges = () => {
    updatePoint(point.id, {
      mediaUrl: mediaUrl,
    });

    setIsEditingPoint(null);
  };

  const handleFileChange = async (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).filter((file) =>
        file.type.startsWith("image/")
      );
      setSelectedFiles(filesArray);
    }
  };

  const handleImageUpload = async () => {
    if (selectedFiles.length === 0) {
      // setMessage("Please select at least one image.");
      alert("Please select at least one image.");
      return;
    }

    // setUploading(true);
    // setMessage(null);

    try {
      const formData = new FormData();
      formData.append("brochureName", flipbookName.trim());
      formData.append("pageNumber", clickedImageIndex);
      // add correct page

      formData.append("isImage", true);

      formData.append("coordinates", JSON.stringify(currentCordinate));
      // add correct coordinate

      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch(`${BASE_URL}/link/upload-image-link`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      //   setMessage("Upload successful");
      //   setPopUpVisible(false);
      //   getAllBrocchures();
      //   setPopUpVisible(false);
      console.log("Server response:", data);
      setSelectedFiles([]);
    } catch (err) {
      console.error(err);
      //   setMessage(err.message || "An error occurred while uploading.");
    } finally {
      //   setUploading(false);
    }
  };

  return (
    <div
      className="absolute inset-0 bg-gray-800/35 flex items-center justify-center z-[60]"
      onClick={() => setIsEditingPoint(null)}
    >
      <div
        className="bg-white p-6 rounded-lg max-w-xs w-full  max-h-[90vh] overflow-y-auto "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end pb-2">
          <button
            onClick={() => setIsEditingPoint(null)}
            className="text-gray-500 hover:text-gray-700 ml-auto"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex items-center justify- gap-2 mb-4 text-sm">
          {[
            { label: "Edit Point", tab: 1 },
            { label: "Add Carousel", tab: 2 },
          ].map(({ label, tab }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200  ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === 1 && (
          <>
            <div className="space-y-4 ">
              <label className="block text-sm font-medium mb-1">
                <Link2 size={16} className="inline mr-1" />
                Url
              </label>
              <input
                type="url"
                autoFocus
                value={mediaUrl}
                onChange={(e) => {
                  setMediaUrl(e.target.value);
                }}
                name
                required
                className="w-full p-2 border rounded "
                placeholder="https://..."
              />
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => {
                  saveChanges();
                  addPoint();
                }}
                className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
              <button
                onClick={() => deletePoint(point.id)}
                className="px-4 bg-red-500 text-white py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </>
        )}

        {activeTab === 2 && (
          <>
            <div>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8  text-center hover:border-outline-blue-500 hover:border-blue-500 cursor-pointer transition-colors"
              >
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Click to upload images</p>
                <p className="text-sm text-gray-500 mt-1">
                  Select multiple images at once
                </p>
              </div>

              {selectedFiles.length > 0 && (
                <p className="text-sm text-gray-500 mt-1 text-center">
                  {selectedFiles.length} files selected
                </p>
              )}

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="flex gap-4 mt-1">
              <button
                onClick={handleImageUpload}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Save size={20} />
                upload images
                {/* {uploading && <Loader2 size={20} className="animate-spin" />} */}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditPointModal;
