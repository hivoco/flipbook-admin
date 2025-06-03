import React, { useState, useRef } from 'react';
import { Play, Pause, X, Upload, Type, Mic, Video, Edit3 } from 'lucide-react';
import Image from 'next/image';

const InteractiveImagePoints = () => {
  const [points, setPoints] = useState([]);
    const [isEditingPoint, setIsEditingPoint] = useState(null);

  const [selectedPoint, setSelectedPoint] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Sample image URL for demo
  const defaultImageUrl = "https://i.sstatic.net/ZyP3Q.png";

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    console.log(x, y);
    
    const newPoint = {
      id: Date.now(),
      x: x,
      y: y,
      label: '',
      audioUrl: '',
      videoUrl: '',
      audioFile: null,
      videoFile: null
    };
    
    setPoints([...points, newPoint]);
    setIsEditingPoint(newPoint.id);
  };


  const handlePointClick = (e, point) => {
    e.stopPropagation();
    if (point.label || point.audioUrl || point.videoUrl || point.audioFile || point.videoFile) {
      setSelectedPoint(selectedPoint === point.id ? null : point.id);
    } else {
      setIsEditingPoint(point.id);
    }
  };

  const updatePoint = (pointId, updates) => {
    setPoints(points.map(point => 
      point.id === pointId ? { ...point, ...updates } : point
    ));
  };

  const deletePoint = (pointId) => {
    setPoints(points.filter(point => point.id !== pointId));
    setSelectedPoint(null);
    setIsEditingPoint(null);
  };

  const handleFileUpload = (pointId, file, type) => {
    if (file) {
      const url = URL.createObjectURL(file);
      updatePoint(pointId, { 
        [type === 'audio' ? 'audioFile' : 'videoFile']: file,
        [type === 'audio' ? 'audioUrl' : 'videoUrl']: url
      });
    }
  };

  const isPointFilled = (point) => {
    return point.label || point.audioUrl || point.videoUrl || point.audioFile || point.videoFile;
  };

  const MediaPlayer = ({ point, type }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const mediaRef = useRef(null);

    const togglePlay = () => {
      if (mediaRef?.current) {
        if (isPlaying) {
          mediaRef?.current.pause();
        } else {
          mediaRef?.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };

    const url = type === 'audio' 
      ? (point.audioFile ? URL.createObjectURL(point.audioFile) : point.audioUrl)
      : (point.videoFile ? URL.createObjectURL(point.videoFile) : point.videoUrl);

    if (!url) return null;

    return (
      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={togglePlay}
          className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          Play {type}
        </button>
        {type === 'audio' ? (
          <audio
            ref={mediaRef}
            src={url}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
        ) : (
          <video
            ref={mediaRef}
            src={url}
            onEnded={() => setIsPlaying(false)}
            controls={true}
            className={`w-full h-auto`}
          />
        )}
      </div>
    );
  };

  const EditPointModal = ({ point }) => {
    const [localLabel, setLocalLabel] = useState(point.label);
    const [localAudioUrl, setLocalAudioUrl] = useState(point.audioUrl);
    const [localVideoUrl, setLocalVideoUrl] = useState(point.videoUrl);

    const saveChanges = () => {
      updatePoint(point.id, {
        label: localLabel,
        audioUrl: localAudioUrl,
        videoUrl: localVideoUrl
      });
      setIsEditingPoint(null);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Edit Point</h3>
            <button 
              onClick={() => setIsEditingPoint(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Text Label */}
            <div>
              <label className="block text-sm font-medium mb-1">
                <Type size={16} className="inline mr-1" />
                Text Label
              </label>
              <input
                type="text"
                value={localLabel}
                onChange={(e) => setLocalLabel(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Enter label text..."
              />
            </div>

            {/* Audio Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">
                <Mic size={16} className="inline mr-1" />
                Audio
              </label>
              <div className="space-y-2">
                <input
                  type="url"
                  value={localAudioUrl}
                  onChange={(e) => setLocalAudioUrl(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter audio URL..."
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">or</span>
                  <button
                    onClick={() => audioInputRef.current?.click()}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    <Upload size={14} />
                    Upload File
                  </button>
                </div>
                <input
                  ref={audioInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleFileUpload(point.id, e.target.files[0], 'audio')}
                  className="hidden"
                />
                {(point.audioFile || point.audioUrl) && (
                  <MediaPlayer point={point} type="audio" />
                )}
              </div>
            </div>

            {/* Video Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">
                <Video size={16} className="inline mr-1" />
                Video
              </label>
              <div className="space-y-2">
                <input
                  type="url"
                  value={localVideoUrl}
                  onChange={(e) => setLocalVideoUrl(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter video URL..."
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">or</span>
                  <button
                    onClick={() => videoInputRef.current?.click()}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    <Upload size={14} />
                    Upload File
                  </button>
                </div>
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileUpload(point.id, e.target.files[0], 'video')}
                  className="hidden"
                />
                {(point.videoFile || point.videoUrl) && (
                  <MediaPlayer point={point} type="video" />
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <button
              onClick={saveChanges}
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
        </div>
      </div>
    );
  };

  const PointPopover = ({ point }) => (
    <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-3 min-w-48 z-40"
         style={{ 
           left: `${point.x}%`, 
           top: `${point.y + 3}%`,
           transform: 'translateX(-50%)'
         }}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-800">Point Details</h4>
        <button 
          onClick={() => setIsEditingPoint(point.id)}
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
        {(point.audioFile || point.audioUrl) && (
          <MediaPlayer point={point} type="audio" />
        )}
        {(point.videoFile || point.videoUrl) && (
          <MediaPlayer point={point} type="video" />
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
        

        {/* Image Container */}
        <div className="relative inline-block border border-gray-300 rounded-lg overflow-hidden">
          <Image
            width={500}
            height={300}
            src={   imageUrl || "/image.png" }
            alt="Interactive image"
            className="max-w-full h-auto cursor-crosshair"
            onClick={handleImageClick}
            onError={() => setImageUrl(defaultImageUrl)}
            priority={true}
          />
          
          {points.map((point) => (
            <div key={point.id}>
              <div
                className={`absolute w-4 h-4 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 border-2 border-white shadow-lg ${
                  isPointFilled(point) ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                onClick={(e) => handlePointClick(e, point)}
              />
              
              {selectedPoint === point.id && (
                <PointPopover point={point} />
              )}
            </div>
          ))}
        </div>


      {/* Edit Modal */}
      {isEditingPoint && (
        <EditPointModal 
          point={points.find(p => p.id === isEditingPoint)} 
        />
      )}
    </div>
  );
};

export default InteractiveImagePoints;