import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Clock from "./Clock"; // Clockコンポーネントのインポート
import Navigate from "./components/Navigate";
import Search from "./components/Search";
import SetSepartureStation from "./components/SetSepartureStation";
import SetArrivalStation from "./components/SetArrivalStation";
import SelectTeam from "./components/SelectTeam";
import SelectStadium from "./components/SelectStadium";
import InitialSettings from "./components/InitialSettings";
import CurrentDate from "./components/CurrentDate";
import MatchesHeld from "./components/MatchesHeld";
import MatchesHeldAll from "./components/MatchesHeldAll";

import "./style.css";

const App = () => (
  <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/navigate" element={<Navigate />} />
        <Route path="/search" element={<Search />} />
        <Route path="/setSepartureStation" element={<SetSepartureStation />} />
        <Route path="/SetArrivalStation" element={<SetArrivalStation />} />
        <Route path="/selectTeam" element={<SelectTeam />} />
        <Route path="/selectStadium" element={<SelectStadium />} />
        <Route path="/initialSettings" element={<InitialSettings />} />
        <Route path="/matchesHeldAll" element={<MatchesHeldAll />} />
        <Route path="/clock" element={<Clock />} />
      </Routes>
    </div>
  </BrowserRouter>
);

const Home = () => {
  return (
    <div>
      <Navigate />
      <div className="flex w-full flex-col items-center justify-center pb-10">
        <CurrentDate />
        <MatchesHeld />
        <Search />
      </div>
    </div>
  );
};

export default App;
