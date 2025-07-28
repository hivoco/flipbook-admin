import { Switch } from "@headlessui/react";
import { useState } from "react";

export default function SwitchButton({ enabled, onToggle }) {
  return (
    <Switch
      checked={enabled}
      onChange={onToggle}
      className={`group relative flex h-7 w-14 cursor-pointer rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none  
        ${enabled ? "bg-black" : "bg-gray-300"}`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block size-5 transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out 
          ${enabled ? "translate-x-7 bg-white" : "translate-x-0 bg-black"}`}
      />
    </Switch>
  );
}
