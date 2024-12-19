import React from "react";

// 祝日のデータ
const holidays = [
  { date: "2024-01-01", name: "元日" },
  { date: "2024-02-11", name: "建国記念の日" },
];

// 曜日を取得する関数
const getDayOfWeek = (date) => {
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return days[date.getDay()];
};

// 日付をフォーマットする関数
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const dayOfWeek = getDayOfWeek(date);

  // 祝日判定
  const holiday = holidays.find(
    (h) => h.date === date.toISOString().split("T")[0]
  );
  const dayOfWeekWithHoliday = holiday ? `${dayOfWeek}祝` : dayOfWeek;

  return `${year}年${month}月${day}日（${dayOfWeekWithHoliday}）`;
};

const CurrentDate = () => {
  const today = new Date();

  return (
    <div>
      <p className="text-white text-xl font-semibold py-6">
        {formatDate(today)} の試合
      </p>
    </div>
  );
};

export default CurrentDate;
