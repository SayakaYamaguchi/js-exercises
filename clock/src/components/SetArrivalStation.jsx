import React, { useState, useEffect, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import "./../style.css";

const SetArrivalStation = ({ onStationSelect }) => {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async (stadiumName) => {
      try {
        // stadium.json のデータを取得
        const response = await fetch("/src/assets/data/stadium.json");
        const stadiumData = await response.json();

        // stadiumName に一致するデータを検索
        const matchedStadium = stadiumData.find(
          (stadium) => stadium.stadiumName === stadiumName.trim()
        );

        if (matchedStadium && matchedStadium.stations) {
          // stationXX配下のデータを取得し配列に整形
          const stationList = Object.values(matchedStadium.stations).map(
            (station) => ({
              code: station.code,
              name: station.name,
            })
          );
          setStations(stationList);

          // 初期値を最初の駅に設定
          const initialStation = stationList[0];
          setSelectedStation(initialStation);
          onStationSelect(initialStation); // 初期選択状態を親に渡す
        } else {
          setError("指定された球場のデータが見つかりません");
        }
      } catch (err) {
        console.error("Error fetching or parsing stadium data:", err);
        setError("データの取得に失敗しました");
      }
    };

    // MutationObserver を使用して span.todayStadium を監視
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          const stadiumElement = document.querySelector("span.todayStadium");
          if (stadiumElement) {
            const stadiumName = stadiumElement.textContent;
            observer.disconnect();
            fetchData(stadiumName);
          }
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [onStationSelect]);

  const handleSelect = (station) => {
    setSelectedStation(station);
    onStationSelect(station);
  };

  if (error) {
    return <div className="text-center mt-4 text-red-500">{error}</div>;
  }

  return (
    <div className="top-16 w-full flex flex-col items-center space-y-4">
      <div className="w-72">
        <Listbox value={selectedStation} onChange={handleSelect}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 sm:text-sm">
              <span className="block truncate py-2 pl-3">
                {selectedStation
                  ? selectedStation.name
                  : "駅を選択してください"}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
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
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {stations.map((station) => (
                  <Listbox.Option
                    key={station.code}
                    value={station}
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
                          {station.name}
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
        </Listbox>{" "}
      </div>
    </div>
  );
};

export default SetArrivalStation;
