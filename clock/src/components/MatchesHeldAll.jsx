import React, { useState, useEffect } from "react";
import Navigate from "./Navigate";
import CurrentDate from "/src/components/CurrentDate";

// game.jsonファイルのパス
const gameJsonPath = "/src/assets/data/game.json";

// 今日の日付を取得
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

const MatchesHeld = () => {
  const [matches, setMatches] = useState([]);
  const [isNotSet, setIsNotSet] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(gameJsonPath);
        const data = await response.json();
        const today = getTodayDate();
        const todayMatches = data.find((game) => game.date === today)?.game;

        // ローカルストレージから値を取得
        const selectedStadium = localStorage.getItem("selectedStadium");
        const selectedTeam = localStorage.getItem("selectedTeam");

        // デバッグ用ログ
        console.log(`selectedStadium: ${selectedStadium}`);
        console.log(`selectedTeam: ${selectedTeam}`);

        // 両方空または両方存在しない場合はメッセージを表示
        if (!selectedStadium && !selectedTeam) {
          setIsNotSet(true);
        } else {
          setIsNotSet(false);
        }

        if (todayMatches) {
          const filteredMatches = Object.values(todayMatches).filter(
            (match) => {
              // スタジアムとチームが一致するかどうか
              const stadiumMatches = selectedStadium
                ? match.stadium === selectedStadium
                : true;
              const teamMatches = selectedTeam
                ? match.homeTeam === selectedTeam ||
                  match.visitorTeam === selectedTeam
                : true;
              console.log(`stadiumMatches:${stadiumMatches}`);
              console.log(`teamMatches:${teamMatches}`);
              return stadiumMatches && teamMatches;
            }
          );
          setMatches(Object.values(todayMatches));
          /*
          // 一致する試合がない場合は全て表示
          if (filteredMatches.length > 0) {
            console.log("一致する試合があります");
            setMatches(filteredMatches);
          } else {
            console.log("一致する試合がありません。すべての試合を表示します。");
            setMatches(Object.values(todayMatches));
          }
            */
        }
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navigate />
      <div className="flex w-full flex-col items-center justify-center pb-10">
        <CurrentDate />
        <div className="flex w-full flex-col items-center justify-center pb-10">
          {matches.length === 0 && (
            <div className="mx-auto w-full max-w-md space-y-2">
              <div className=" max-w-md">
                <div className="bg-white relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">
                      今日は試合がありません。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {matches.length > 0 && (
            <div className="mx-auto w-full max-w-md space-y-2">
              {matches.map((match, index) => (
                <div key={index} className="max-w-md">
                  <div className="bg-white relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none">
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">
                            {match.homeTeam} - {match.visitorTeam}
                          </p>
                          <span className="inline text-gray-500">
                            {match.stadium}
                          </span>
                          <p className="inline text-gray-500 px-2">
                            {match.start}
                          </p>
                          <p className="inline text-gray-500">START</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchesHeld;
