import React, { useState, useEffect, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import "./../style.css";

const fetchStadiums = async () => {
  try {
    const response = await fetch("/src/assets/data/stadium.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching stadiums:", error);
    return [];
  }
};

const SelectStadium = ({ isDisabled, onReset }) => {
  const [stadiums, setStadiums] = useState([]);
  const [selectedStadium, setSelectedStadium] = useState(() => {
    // ページロード時にローカルストレージから値を取得
    const saved = localStorage.getItem("selectedStadium");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const loadStadiums = async () => {
      const data = await fetchStadiums();
      setStadiums(data);
    };

    loadStadiums();
  }, []);

  useEffect(() => {
    if (isDisabled) {
      setSelectedStadium(null); // 選択状態をリセット
      onReset && onReset(); // リセットコールバック
    }
  }, [isDisabled, onReset]);

  const handleSelect = (stadium) => {
    setSelectedStadium(stadium);
    // 選択された球場をローカルストレージに保存
    localStorage.setItem("selectedStadium", JSON.stringify(stadium));
  };

  return (
    <div className={`mt-4 w-72 ${isDisabled ? "opacity-50" : ""}`}>
      <Listbox value={selectedStadium} onChange={handleSelect}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <span className="block truncat py-2 pl-3">
              {selectedStadium
                ? selectedStadium.stadiumName
                : "選択してください"}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 leading-5 text-gray-900 text-sm pointer-events-none">
              <ChevronUpDownIcon
                className={`h-5 w-5 ${
                  isDisabled ? "text-gray-400" : "text-gray-400"
                }`}
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm listbox-options">
              {stadiums.map((stadium) => (
                <Listbox.Option
                  key={stadium.stadiumid}
                  value={stadium}
                  as={Fragment}
                >
                  {({ active, selected }) => (
                    <li
                      className={`${
                        active
                          ? "bg-orange-600 text-white"
                          : "bg-white text-black"
                      } relative cursor-default select-none py-2 pl-10 pr-4 list-none`}
                    >
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {stadium.stadiumName}
                      </span>
                      {selected && (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-orange-600"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectStadium;
