import React, { useState, useEffect } from "react";
import Navigate from "./Navigate";
import SetSepartureStation from "./SetSepartureStation";
import SelectTeam from "./SelectTeam";
import SelectStadium from "./SelectStadium";
import { RadioGroup } from "@headlessui/react"; // ← RadioGroupをインポート
import { CheckIcon } from "@heroicons/react/20/solid";

import "./../style.css";
const plans = [
  { label: "球団で決める", value: "team" },
  { label: "球場で決める", value: "place" },
];
const InitialSettings = () => {
  const [plan, setPlan] = useState(plans[0].value); // 初期値は最初のvalue
  const [isTeamEnabled, setIsTeamEnabled] = useState(true); // SelectTeamの状態
  const [isStadiumEnabled, setIsStadiumEnabled] = useState(false); // SelectStadiumの状態

  // RadioGroup変更時の処理
  const handlePlanChange = (value) => {
    setPlan(value);

    if (value === "team") {
      setIsTeamEnabled(true);
      setIsStadiumEnabled(false);
      localStorage.removeItem("selectedStadium");
      setStadiumReset(); // Reset Stadium
    } else if (value === "place") {
      setIsTeamEnabled(false);
      setIsStadiumEnabled(true);
      localStorage.removeItem("selectedTeam");
      setTeamReset(); // Reset Team
    }
  };

  // リセット関数の定義
  const setTeamReset = () => {
    // チームのリセットロジックを追加
  };
  const setStadiumReset = () => {
    // キーを更新してコンポーネントをリセット
  };

  return (
    <div>
      <Navigate />
      <div className="flex w-full flex-col items-center justify-center pb-10">
        <h1 className="text-white text-2xl mt-4">初期設定</h1>
        <h2 className="text-white text-2xl mt-4">出発地</h2>
        <div>
          <SetSepartureStation />
        </div>
        <h2 className="text-white text-2xl mt-4">観戦試合を</h2>
        <div className="flex justify-end p-4">
          <RadioGroup value={plan} onChange={handlePlanChange}>
            <div className="flex gap-0.5">
              {plans.map((planOption) => (
                <RadioGroup.Option
                  key={planOption.label} // 表示用テキストをkeyに設定
                  value={planOption.value} // valueを選択値に設定
                  className={({ active, checked }) =>
                    `w-1/2 flex items-center justify-center rounded-lg px-4 py-2 cursor-pointer 
            ${active ? "ring-2 ring-blue-500" : "border"}
            ${
              checked
                ? "bg-orange-500 text-white border-orange-600"
                : "bg-white text-black border-gray-300"
            }`
                  }
                >
                  {({ checked }) => (
                    <div className="flex items-center justify-center w-full">
                      <span className="font-medium">{planOption.label}</span>
                      {checked && <CheckIcon className="h-5 w-5 ml-2" />}
                    </div>
                  )}
                  {planOption.label}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div>
          <SelectTeam
            isDisabled={!isTeamEnabled}
            onReset={() => setTeamReset()}
          />
        </div>

        <div>
          <SelectStadium
            isDisabled={!isStadiumEnabled}
            onReset={() => setStadiumReset()}
          />
        </div>
      </div>
    </div>
  );
};

export default InitialSettings;
