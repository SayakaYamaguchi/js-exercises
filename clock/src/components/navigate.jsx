import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";

const Navigate = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* 左側のロゴ */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold">プロ野球現地観戦アプリ</span>
          </div>

          {/* ハンバーガーメニューボタン */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {/* ハンバーガーアイコン */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>

          {/* PC用メニュー */}
          <div className="hidden sm:flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-800">
              ホーム
            </Link>
            <Link
              to="/initialSettings"
              className="text-gray-600 hover:text-gray-800"
            >
              初期設定
            </Link>
            <Link
              to="/matchesHeldAll"
              className="text-gray-600 hover:text-gray-800"
            >
              今日の試合
            </Link>
          </div>
        </div>
      </div>

      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white shadow-md">
          <Link
            to="/"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            ホーム
          </Link>
          <Link
            to="/initialSettings"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            初期設定
          </Link>
          <Link
            to="/matchesHeldAll"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            今日の試合
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigate;
