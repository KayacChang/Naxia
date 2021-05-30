import React from "react";
import { join } from "path";

export function assets(src: string) {
  return join("/", "sounds", src);
}

const Login = {
  BGM: assets("/bgm/login.mp3"),
};

const Lobby = {
  BGM: assets("/bgm/lobby.mp3"),
  Repo: assets("/effect/repo.mp3"),
  Unlock: assets("/effect/unlock.mp3"),
};

const Room = {
  BGM: assets("/bgm/room.mp3"),
  Start: assets("/effect/start.mp3"),
  Reward: assets("/effect/reward.mp3"),

  Skill_DoubleFire: assets("/effect/doublefire.mp3"),
  Skill_DoubleIceHit: assets("/effect/doubleicehit.mp3"),
  Skill_Fire: assets("/effect/fire.mp3"),
  Skill_IceHit: assets("/effect/icehit.mp3"),
  Skill_Wind: assets("/effect/wind.mp3"),
};

const Sound = {
  Login,
  Lobby,
  Room,
};

export default Sound;
