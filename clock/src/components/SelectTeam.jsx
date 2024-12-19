import React, { useState, useEffect, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import "./../style.css";

const fetchTeams = async () => {
  try {
    const response = await fetch("/src/assets/data/team.json");
    const data = await response.json();

    // 並べ替え: CLが上、PLが下。rankが小さい順
    data.sort((a, b) => {
      if (a.league === b.league) {
        return a.rank - b.rank;
      }
      return a.league === "CL" ? -1 : 1;
    });

    return data;
  } catch (error) {
    console.error("Error fetching teams:", error);
    return [];
  }
};

const SelectTeam = ({ isDisabled, onReset }) => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(() => {
    // ページロード時にローカルストレージから値を取得
    const saved = localStorage.getItem("selectedTeam");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const loadTeams = async () => {
      const data = await fetchTeams();
      setTeams(data);
    };
    loadTeams();
  }, []);

  useEffect(() => {
    if (isDisabled) {
      setSelectedTeam(null); // 選択状態をリセット
      onReset && onReset(); // リセットコールバック
    }
  }, [isDisabled, onReset]);

  const handleSelect = (team) => {
    setSelectedTeam(team); // 選択されたチームをローカルストレージに保存
    localStorage.setItem("selectedTeam", JSON.stringify(team));
  };

  return (
    <div className={`mt-4 w-72 ${isDisabled ? "opacity-50" : ""}`}>
      <Listbox value={selectedTeam} onChange={handleSelect}>
        <div className="relative mt-1">
          <Listbox.Button
            className={`relative w-full cursor-default overflow-hidden rounded-lg ${
              isDisabled ? "bg-gray-200" : "bg-white"
            } text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm`}
          >
            <span className="block truncate py-2 pl-3">
              {selectedTeam ? selectedTeam.teamName : "選択してください"}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
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
              {teams.map((team) => (
                <Listbox.Option key={team.id} value={team} as={Fragment}>
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
                        {team.teamName}
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

export default SelectTeam;
