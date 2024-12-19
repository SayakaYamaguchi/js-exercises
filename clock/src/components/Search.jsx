import React, { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react"; // ← RadioGroupをインポート
import { CheckIcon } from "@heroicons/react/20/solid";
import SetSepartureStation from "/src/components/SetSepartureStation";
import SetArrivalStation from "/src/components/SetArrivalStation";

import "./../style.css";
const plans = ["15", "30", "45", "60"];

// 共通の formatTime 関数
const formatTime = (time) => {
  const date = time ? new Date(time) : new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};
const Search = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [countdown, setCountdown] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [plan, setPlan] = useState(null); // デフォルト未選択
  const [arrivalStation, setArrivalStation] = useState(null); // 到着駅の状態管理
  const [isPast, setIsPast] = useState(false); // 試合が過去かどうかの状態管理
  const [gameStartTime, setGameStartTime] = useState(null); // 試合開始時間
  const [isLoading, setIsLoading] = useState(false); // APIの実行中フラグ

  // 現在時刻の更新
  useEffect(() => {
    setCurrentTime(formatTime());

    const timer = setInterval(() => {
      setCurrentTime(formatTime());
      updateCountdown();
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // DOM監視用のMutationObserver
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList" || mutation.type === "subtree") {
          const gameStartElement = document.querySelector("p.gameStart");
          if (gameStartElement && gameStartElement.textContent.trim()) {
            const time = gameStartElement.textContent.trim();
            console.log("gameStartTime is set to:", time);
            setGameStartTime(time); // ステートにセット
            observer.disconnect();
            break;
          }
        }
      }
    });
    // body全体を監視
    observer.observe(document.body, { childList: true, subtree: true });
    // クリーンアップ処理
    return () => observer.disconnect();
  }, [plan, arrivalStation]);

  // 到着駅とRadioGroupが変更された時にfetchRouteDataを実行
  useEffect(() => {
    if (arrivalStation && gameStartTime && plan) {
      fetchRouteData(plan, gameStartTime);
    }
  }, [plan, arrivalStation, gameStartTime]);

  // カウントダウンの更新
  useEffect(() => {
    if (departureTime) {
      updateCountdown();
    }
  }, [departureTime]);

  const updateCountdown = () => {
    if (!departureTime) return;

    const now = new Date();
    const [hours, minutes] = departureTime.split(":").map(Number);
    const departure = new Date();
    departure.setHours(hours, minutes, 0, 0);

    const diff = departure - now;

    if (diff > 0) {
      const remainingMinutes = Math.floor(diff / 60000);
      setCountdown(
        `${Math.floor(remainingMinutes / 60)}時間${remainingMinutes % 60}分`
      );
      setIsPast(false); // まだ過去ではない

      // 背景色の処理
      if (remainingMinutes < 5) {
        document.body.style.backgroundColor = "red";
      } else if (remainingMinutes < 15) {
        document.body.style.backgroundColor = "orange";
      } else {
        document.body.style.backgroundColor = "";
      }
    } else {
      setCountdown("出発時刻を過ぎました");
      setIsPast(true); // 試合開始を過ぎたと設定
      document.body.style.backgroundColor = "#ccc";
    }
  };

  const fetchRouteData = async (minutesToSubtract, gameStartTime) => {
    if (!minutesToSubtract || isLoading) return; // 重複実行を防ぐ
    setIsLoading(true); // 実行開始

    try {
      const selectedStation = JSON.parse(
        localStorage.getItem("selectedStation")
      );
      if (!selectedStation || !selectedStation.code || !arrivalStation) return;

      const departureCode = selectedStation.code;
      const arrivalCode = arrivalStation.code;

      const today = new Date();
      const YYYYMMDD = `${today.getFullYear()}${String(
        today.getMonth() + 1
      ).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;

      // 試合開始時刻をcalculateTimeに渡す
      const HHMM = calculateTime(gameStartTime, minutesToSubtract);
      console.log(`gameStartTime ${gameStartTime}`);
      console.log(`minutesToSubtract ${minutesToSubtract}`);
      console.log(`HHMM ${HHMM}`);
      if (!HHMM) return; // 試合開始が過去の場合、処理を中断

      console.log(`YYYYMMDD ${YYYYMMDD}`);
      const apiKey = import.meta.env.VITE_API_KEY; // 環境変数から取得
      const response = await fetch(
        `https://api.ekispert.jp/v1/json/search/course?key=${apiKey}&from=${departureCode}&to=${arrivalCode}&date=${YYYYMMDD}&time=${HHMM}&searchType=arrival`
      );

      const data = await response.json();
      const course = data.ResultSet.Course[0];
      const fetchedDepartureTime =
        course.Route.Line[0]?.DepartureState?.Datetime.text;

      if (fetchedDepartureTime) {
        setDepartureTime(formatTime(fetchedDepartureTime));
        setIsPast(false);
      } else {
        console.warn("APIから有効な出発時刻が返されませんでした。");
      }
    } catch (error) {
      console.error("Error fetching route data:", error);
    } finally {
      setIsLoading(false); // 実行完了
    }
  };

  const calculateTime = (timeString, minutesToSubtract) => {
    console.log("minutesToSubtract:", minutesToSubtract);
    console.log("Invalid timeString:", timeString);
    if (!timeString || !timeString.includes(":")) {
      return null; // 不正な場合はnullを返す
    }

    const [hours, minutes] = timeString.split(":").map(Number);
    const now = new Date();

    // 試合開始時間を設定
    const startTime = new Date();
    startTime.setHours(hours, minutes, 0, 0);

    // startTimeが現在時刻よりも前（昨日の時間と判定される）場合、日付を1日進める
    if (startTime < now) {
      startTime.setDate(startTime.getDate() + 1); // 翌日に設定
    }

    console.log(`Adjusted startTime: ${startTime}`);
    console.log(`${startTime.getHours()}:${startTime.getMinutes()}`);
    console.log(`${now.getHours()}:${now.getMinutes()}`);

    // 出発時間を計算
    const departureTime = new Date(startTime);
    departureTime.setMinutes(
      departureTime.getMinutes() - parseInt(minutesToSubtract, 10)
    );

    const newHours = String(departureTime.getHours()).padStart(2, "0");
    const newMinutes = String(departureTime.getMinutes()).padStart(2, "0");
    return `${newHours}${newMinutes}`;
  };

  return (
    <div className="justify-center">
      <h2 className="text-white text-2xl mt-4 text-center">出発地</h2>
      <SetSepartureStation />
      <h2 className="text-white text-2xl mt-4 text-center">到着地</h2>
      <SetArrivalStation onStationSelect={setArrivalStation} />

      <h2
        className={`text-white text-2xl mt-4 text-center ${
          isPast ? "hidden" : "behindTime"
        }`}
      >
        到着時刻
      </h2>
      {isPast && (
        <div className="behindTime02 text-red-500">試合は開始済みです</div>
      )}
      <RadioGroup
        value={plan}
        onChange={(value) => {
          // デバッグログを追加
          console.log("ラジオボタンがクリックされました:", value);
          console.log("現在の gameStartTime:", gameStartTime);

          if (!gameStartTime) {
            console.warn("gameStartTimeがまだ設定されていません。");
            return; // 処理を中断
          }
          setPlan(value); // ステートを更新
        }}
        className="behindTime"
      >
        <div className="flex gap-0.5">
          {plans.map((value) => (
            <RadioGroup.Option
              key={value}
              value={value}
              disabled={!gameStartTime} // gameStartTimeが未設定なら無効化
              className={({ active, checked, disabled }) =>
                `w-1/2 flex items-center justify-center rounded-lg px-2 py-5 cursor-pointer 
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                ${active ? "ring-2 ring-blue-500" : "border"}
                ${
                  checked
                    ? "bg-orange-500 text-white border-orange-600"
                    : "bg-white text-black border-gray-300"
                }`
              }
            >
              {() => (
                <div className="flex items-center justify-center w-full">
                  <span className="font-medium">{`${value}分前`}</span>
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      <div className="mx-auto w-full max-w-md space-y-2 py-6">
        <div className=" max-w-md">
          <div className="bg-white relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none">
            <div className="text-sm">
              <div className="font-medium text-gray-900">
                <div className="flex gap-0.5 items-end">
                  <p className="text-base">現在時刻：</p>
                  <p className="text-lg">{currentTime}</p>
                </div>
                <div className="flex gap-0.5 items-end">
                  <p className="text-base">出発時刻：</p>
                  <p className="text-lg">{departureTime || "未設定"}</p>
                </div>
                <div className="flex gap-0.5 items-end">
                  <p className="text-base">出発まであと</p>
                  <p className="text-xl">{countdown}</p>
                </div>
                <div>
                  <span id="DepartureState" className="text-white"></span>
                </div>
                <div className="behindTime02 text-xl　text-red-500"></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
