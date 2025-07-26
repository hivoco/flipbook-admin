import React, { useState } from "react";
import { X } from "lucide-react";
import SwitchButton from "./SwitchButton";
import PlaySound from "./PlaySound";

export default function MenuPopup({
  menuOpen,
  setMenuOpen,
  updateValues,
  isLandscape,
  isPageFlipSoundOn,
  recordingPermisson,
}) {
  const togglePopup = () => setMenuOpen(!menuOpen);
  return (
    <div className=" flex items-center justify-center p-4">
      {/* Popup Overlay */}
      {menuOpen && (
        <div className="absolute right-8 bottom-10  bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full  overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
              <button
                onClick={togglePopup}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Settings Content */}
            <div className="p-6 space-y-6">
              {/* Orientation Setting */}
              <div className="space-y-3">
                <div className="flex gap-3 items-center">
                  <SwitchButton
                    enabled={isLandscape}
                    setEnabled={() => {
                      updateValues({ isLandscape: !isLandscape });
                    }}
                  />
                  <label
                    title={
                      isLandscape
                        ? "single page wide "
                        : " two pages side by side tall"
                    }
                    className="block text-sm font-medium text-gray-700"
                  >
                    {isLandscape ? "Landscape" : "Portrait"}
                  </label>

                  {/* <button
                    onClick={() => {
                      updateUser();
                      togglePopup();
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                      !isLandscape
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }
                    active:border-blue-500
                    `}
                  >
                    <Smartphone className="w-5 h-5" />
                    Portrait
                  </button>
                  <button
                    onClick={() => {
                      updateUser();
                      togglePopup();
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                      isLandscape
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    } active:border-blue-500`}
                  >
                    <Monitor className="w-5 h-5" />
                    Landscape
                  </button> */}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <SwitchButton
                  enabled={isPageFlipSoundOn}
                  setEnabled={() => {
                    updateValues({ pageFlipSound: !isPageFlipSoundOn });
                  }}
                />

                <label
                  title="Turns on the page flip sound"
                  className="block text-sm font-medium text-gray-700"
                >
                  Page Sound
                </label>
              </div>

              <div className="flex items-center gap-3">
                <SwitchButton
                  enabled={recordingPermisson}
                  setEnabled={() => {
                    updateValues({ isRecordingEnable: !recordingPermisson });
                  }}
                />

                <label
                  title="Turns on the page flip sound"
                  className="block text-sm font-medium text-gray-700"
                >
                  Turn On Audio Recording
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
