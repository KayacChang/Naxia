import { assets } from "utils";

const Room = {
  // Room
  Background: assets("/room/background.png"),
  Status: assets("/room/room_status.png"),
  Back: assets("/room/back.png"),

  // Bet
  Bet_Frame: assets("/room/bet/background.png"),
  Bet_Active: assets("/room/bet/bet-active.png"),
  Bet_Normal: assets("/room/bet/bet-normal.png"),
  Bet_Effect: assets("/room/bet/bet-effect.png"),

  // Control
  Control_Confirm_Active: assets("/room/control/confirm-active.png"),
  Control_Confirm_Normal: assets("/room/control/confirm-normal.png"),
  Control_Cancel_Active: assets("/room/control/cancel-active.png"),
  Control_Cancel_Normal: assets("/room/control/cancel-normal.png"),
  Control_Redo_Active: assets("/room/control/redo-active.png"),
  Control_Redo_Normal: assets("/room/control/redo-normal.png"),

  // CountDown
  CountDown_Font: assets("/fonts/countdown.fnt"),
  CountDown_Frame: assets("/room/countdown_frame.png"),

  // RoundStatus
  Round_Status_Frame: assets("/room/round_status_frame.png"),

  // Result
  Result_Success: assets("/room/result/success_flag.png"),
  Result_Failed: assets("/room/result/failed_flag.png"),
  Result_Frame: assets("/room/result/frame.png"),
  Result_Continue: assets("/room/result/continue.png"),

  // Skill
  Skill_Frame: assets("/room/skill/frame.png"),

  // bank_pair
  Skill_FlameThrower_Normal: assets("/room/skill/flamethrower_normal.png"),
  Skill_FlameThrower_Active: assets("/room/skill/flamethrower_active.png"),
  Skill_FlameThrower_Spine: assets("/animation/doublefire/skeleton.json"),

  // banker
  Skill_Blizzard_Normal: assets("/room/skill/blizzard_normal.png"),
  Skill_Blizzard_Active: assets("/room/skill/blizzard_active.png"),
  Skill_Blizzard_Spine: assets("/animation/icehit/skeleton.json"),

  // player
  Skill_FlareBlitz_Normal: assets("/room/skill/flareblitz_normal.png"),
  Skill_FlareBlitz_Active: assets("/room/skill/flareblitz_active.png"),
  Skill_FlareBlitz_Spine: assets("/animation/fire/skeleton.json"),

  // player_pair
  Skill_IceBeam_Normal: assets("/room/skill/icebeam_normal.png"),
  Skill_IceBeam_Active: assets("/room/skill/icebeam_active.png"),
  Skill_IceBeam_Spine: assets("/animation/doubleicehit/skeleton.json"),

  // tie
  Skill_Hurricane_Normal: assets("/room/skill/hurricane_normal.png"),
  Skill_Hurricane_Active: assets("/room/skill/hurricane_active.png"),
  Skill_Hurricane_Spine: assets("/animation/wind/skeleton.json"),
};

const Lobby = {
  // Map
  Map: assets("/lobby/map.png"),

  // Dungeon
  Dungeon_Frame: assets("/lobby/dungeon/dungeon_frame.png"),
  Dungeon_1: assets("/lobby/dungeon/dungeon_1.png"),
  Dungeon_2: assets("/lobby/dungeon/dungeon_2.png"),
  Dungeon_3: assets("/lobby/dungeon/dungeon_3.png"),

  // Dungeon Info
  Dungeon_Info_Background: assets("/lobby/dungeon/background.png"),
  Dungeon_Info_Btn_Join: assets("/lobby/dungeon/btn_join.png"),
  Dungeon_Info_Btn_Back: assets("/lobby/dungeon/btn_back.png"),
  Dungeon_Info_Preview_Frame: assets("/lobby/dungeon/preview_frame.png"),
  Dungeon_Info_Name_Frame: assets("/lobby/dungeon/name_frame.png"),
  Dungeon_Info_Preview_1: assets("/lobby/dungeon/preview_1.png"),

  // Repository
  Repo_Frame_Inner: assets("/lobby/repository/frame_inner.png"),
  Repo_Frame_Outer: assets("/lobby/repository/frame_outer.png"),
  Repo_HR: assets("/lobby/repository/hr.png"),
  Repo_Tab_Normal: assets("/lobby/repository/tab_normal.png"),
  Repo_Tab_Active: assets("/lobby/repository/tab_active.png"),
  Repo_Item_Epic: assets("/lobby/repository/item_epic.png"),
  Repo_Item_Legendary: assets("/lobby/repository/item_legendary.png"),
  Repo_Item_Rare: assets("/lobby/repository/item_rare.png"),
  Repo_Item_Uncommon: assets("/lobby/repository/item_uncommon.png"),
};

const Login = {
  Background: assets("/login/background.png"),
  Logo: assets("/login/logo.png"),
  Submit: assets("/login/submit-btn.png"),
  Form: assets("/login/input-form.png"),
};

const Common = {
  // Header
  Profile: assets("/lobby/profile.png"),
  Location: assets("/lobby/location.png"),
  Balance: assets("/lobby/balance.png"),

  // Balance
  Balance_Frame: assets("/balance/frame.png"),
  Balance_Gem: assets("/balance/gem.png"),

  // Modal
  Modal_Frame_Inner: assets("/modal/modal_frame_inner.png"),
  Modal_Frame_Inner_Bottom: assets("/modal/modal_frame_inner_bottom.png"),
  Modal_Frame_Outer: assets("/modal/modal_frame_outer.png"),
  Modal_Title: assets("/modal/modal_title.png"),
  Modal_Button: assets("/modal/modal_button.png"),

  // Road
  Road_Frame: assets("/road/frame.png"),
  Road_Blue: assets("/road/blue.png"),
  Road_Red: assets("/road/red.png"),

  // Avatar
  Avatar_Frame: assets("/avatar/avatar_frame.png"),
  Avatar_Rate_Frame: assets("/avatar/rate_frame.png"),
  Avatar_Win: assets("/avatar/win.png"),
  Avatar_Lose: assets("/avatar/lose.png"),
  Avatar_Glow: assets("/avatar/glow.png"),

  Avatar_01: assets("/avatar/01.png"),
  Avatar_02: assets("/avatar/02.png"),
  Avatar_03: assets("/avatar/03.png"),
  Avatar_04: assets("/avatar/04.png"),
  Avatar_05: assets("/avatar/05.png"),
  Avatar_06: assets("/avatar/06.png"),
  Avatar_07: assets("/avatar/07.png"),
  Avatar_08: assets("/avatar/08.png"),

  // Sidebar
  Sidebar_Announcement: assets("/sidebar/announcement.png"),
  Sidebar_Setting: assets("/sidebar/setting.png"),
};

export default {
  Common,
  Login,
  Lobby,
  Room,
};
