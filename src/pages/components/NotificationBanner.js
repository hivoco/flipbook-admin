import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { X } from "lucide-react";

export default function NotificationBanner({text}) {
  const [show, setShow] = useState(true);

  return (
    <div className="fixed top-4 inset-x-0 flex justify-center z-50">
      <Transition
        as={Fragment}
        show={show}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 -translate-y-4"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-4"
      >
        <div className="bg-white text-black px-5 py-3 rounded-l-xl shadow-lg border  flex items-center justify-between  ">
          <span className="font-medium">{text}</span>
          <button onClick={() => setShow(false)} className="ml-4">
            <X className="w-4 h-4" />
          </button>
        </div>
      </Transition>
    </div>
  );
}
