import React, { Component }  from 'react';
import { useState } from "react";
import Assets from "assets";
import { Modal, SystemModal } from "components";

const icon = {
  key: "information",
  icons: {
    normal: Assets.Common.Sidebar_Information,
  },
  href: "#",
};
export function Information() {
  const [isOpen, setOpen] = useState(false);

  const information = [
    { label: "桌台編號", value: "百家樂-4" },
    { label: "荷官名稱", value: "Amy" },
    { label: "遊戲局號", value: "4-46" },
    { label: "遊戲編號", value: "129516124" },
    { label: "下注限紅", value: "1-15" },
  ];

  return (
    <>
      <div className="relative">
        <div className="absolute text-yellow-100 text-shadow tracking-wider bottom-2 right-0 text-sm">
          資訊
        </div>
        <button onClick={() => setOpen(true)}>
          <img src={icon.icons.normal} alt={icon.key} />
        </button>
      </div>

      {isOpen && (
        <Modal onClose={() => setOpen(false)}>
          <SystemModal
            title="牌桌資訊"
            button="確認"
            onConfirm={() => setOpen(false)}
          >
            <div className="relative flex justify-center items-center w-full h-full">
              <img src={Assets.Common.Modal_Frame_Information} alt="frame" />

              <div className="absolute flex flex-col p-4 text-sm font-kai w-full">
                {information.map(({ label, value }) => (
                  <div key={label} className="flex space-x-4 py-1">
                    <h3>{label}:</h3>
                    <p className="text-yellow-300">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </SystemModal>
        </Modal>
      )}
    </>
  );
}
