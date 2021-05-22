import { join } from "path";

export function assets(src: string) {
  return join("/", "sounds", src);
}

const Login = {
  BGM: assets("/bgm/login.mp3"),
};

const Lobby = {
  BGM: assets("/bgm/lobby.mp3"),
  Repo: assets("/effect/repo.webm"),
  Unlock: assets("/effect/unlock.webm"),
};

const Room = {
  BGM: assets("/bgm/room.mp3"),
  Start: assets("/effect/start.webm"),
  Reward: assets("/effect/reward.webm"),

  Skill_DoubleFire: assets("/effect/doublefire.webm"),
  Skill_DoubleIceHit: assets("/effect/doubleicehit.webm"),
  Skill_Fire: assets("/effect/fire.webm"),
  Skill_IceHit: assets("/effect/icehit.webm"),
  Skill_Wind: assets("/effect/wind.webm"),
};

const Sound = {
  Login,
  Lobby,
  Room,
};

export default Sound;
