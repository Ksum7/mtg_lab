import React, { useEffect, useRef } from "react";
import { ColorStats } from './widgets/colorStats';
import { ManaCostStats } from './widgets/manaCostStats';

const StatsContainer = ({ deck }) => {
  const colorStatsRef = useRef(null);
  const manaStatsRef = useRef(null);

  useEffect(() => {
    if (colorStatsRef.current && manaStatsRef.current) {
      new ColorStats().buildStats(colorStatsRef.current, deck);
      new ManaCostStats().buildStats(manaStatsRef.current, deck);
    }
  }, [deck]);

  return (
    <div className="stats-container">
      <h2>Stats</h2>
      <div className="widgets">
        <div ref={manaStatsRef}></div>
        <div ref={colorStatsRef}></div>
      </div>
    </div>
  );
};

export default StatsContainer;