import { join } from "path";

export function assets(src: string) {
  return join("/", "sounds", src);
}

const Login = {
  BGM: assets("/bgm/login.mp3"),
};

const Lobby = {
  BGM: assets("/bgm/lobby.mp3"),
};

const Room = {
  BGM: assets("/bgm/room.mp3"),
};

const Sound = {
  Login,
  Lobby,
  Room,
};

export default Sound;
