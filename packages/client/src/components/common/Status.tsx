import React, { Component }  from 'react';
import Assets from "assets";
import { useUserBalance } from "system";

export function Status() {
  const value = useUserBalance();

  return (
    <div className="absolute right-0 p-2 pr-3 z-30">
      <div className="relative w-44 text-white text-sm flex items-center">
        <img src={Assets.Common.Balance} alt="status frame" />

        <span className="absolute pl-12 mb-0.5 text-fansy">{value}</span>
      </div>
    </div>
  );
}
