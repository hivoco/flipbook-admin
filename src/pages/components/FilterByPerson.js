"use client";

import { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { Check, ChevronsUpDown } from "lucide-react";
import { employeeArray } from "../../../constant";

export default function FilterByPerson({ flipbooks, setFilteredFlipbooks }) {
  const [selectedEmployee, setSelectedEmployee] = useState("All");
  //   console.log(flipbooks);

  const handleChange = (selected) => {
    setSelectedEmployee(selected);
    if (selected.toLowerCase() === "all") {
      setFilteredFlipbooks(flipbooks);
      return;
    }

    setFilteredFlipbooks(
      flipbooks.filter(
        (f) => f?.personName?.toLowerCase() === selected?.toLowerCase()
      )
    );
  };

  return (
    <div className="max-w-md mx-auto p-4 ">
      {/* <h1 className="text-xl font-semibold mb-4">Filter by Employee</h1> */}

      <Listbox value={selectedEmployee} onChange={handleChange}>
        <div className="relative">
          <ListboxButton className="w-full min-w-40 border border-gray-300 rounded p-2 mb-4 flex justify-between items-center gap-2">
            <span>
              {selectedEmployee === "All"
                ? "Filter by Person"
                : selectedEmployee}
            </span>
            <ChevronsUpDown className="w-4 h-4 text-gray-500" />
          </ListboxButton>

          <ListboxOptions className="absolute mt-1  w-full  bg-white border border-gray-200 rounded shadow-lg z-10">
            <ListboxOption
              key="All"
              value="All"
              className={({ active }) =>
                `p-2 cursor-pointer flex justify-between items-center ${
                  active ? "bg-gray-100" : ""
                }`
              }
            >
              <span>All</span>
              {selectedEmployee === "All" && (
                <Check className="w-4 h-4 text-blue-500" />
              )}
            </ListboxOption>
            {employeeArray.map((emp) => (
              <ListboxOption
                key={emp}
                value={emp}
                className={({ active }) =>
                  `p-2 cursor-pointer flex justify-between items-center ${
                    active ? "bg-gray-100" : ""
                  }`
                }
              >
                <span className="text-center">{emp}</span>
                {selectedEmployee === emp && (
                  <Check className="w-4 h-4 text-blue-500" />
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}
