import { assets } from "utils";

const Room = {
  // Room
  Room_Background: assets("/room/background.png"),
  Room_Status: assets("/room/room_status.png"),
  Room_Back: assets("/room/back.png"),

  // Road
  Road_Frame_Small: assets("/road/frame_small.png"),
  Road_Frame_Big: assets("/road/frame_big.png"),
  Road_Frame: assets("/road/frame.png"),
  Road_Ring_Red: assets("/road/big_ring_red.png"),
  Road_Ring_Blue: assets("/road/big_ring_blue.png"),
  Road_Frame_Banker: assets("/road/frame_banker.png"),
  Road_Frame_Player: assets("/road/frame_player.png"),
  Road_Frame_Tie: assets("/road/frame_tie.png"),
  Road_Frame_Banker_Pair: assets("/road/frame_banker_pair.png"),
  Road_Frame_Player_Pair: assets("/road/frame_player_pair.png"),

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

  // Lock
  Lock: assets("/lobby/lock.png"),
  Lock_Anim: assets("/animation/unlock/skeleton.json"),

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
  Repo_Item_Normal: assets("/lobby/repository/item_normal.png"),
  Repo_Item_Detail_Bg: assets("/lobby/repository/item_detail_bg.png"),

  // Store
  Store_Button_Disable: assets("/lobby/store/button_disable.png"),
  Store_Button_Regular: assets("/lobby/store/button_regular.png"),
  Store_Frame_Bg: assets("/lobby/store/frame_bg.png"),
  Store_Frame_Top_Mask: assets("/lobby/store/frame_top_mask.png"),
  Store_Gem_Sm: assets("/lobby/store/gem_sm.png"),
  Store_Item_Bar_Bg: assets("/lobby/store/item_bar_bg.png"),
  Store_Item_Bar_Frame: assets("/lobby/store/item_bar_frame.png"),
  Store_Item_Card: assets("/lobby/store/item_card.png"),
  Store_Number_Frame_Bg: assets("/lobby/store/number_frame_bg.png"),
  Store_Mob_01: assets("/lobby/store/mob_goblin.png"),

  //Ranking
  Ranking_Background: assets("/lobby/ranking/background.png"),
  Ranking_Tab_Normal: assets("/lobby/ranking/tab_normal.png"),
  Ranking_Tab_Active: assets("/lobby/ranking/tab_active.png"),
  Ranking_UpdateTime_background: assets(
    "/lobby/ranking/updateTime_background.png"
  ),
  Ranking_Item_Background: assets("/lobby/ranking/rankItem_background.png"),
  Ranking_Avatar_Background: assets("/lobby/ranking/avatar_background.png"),
  Ranking_Avatar: assets("/lobby/ranking/avatar.png"),
  Ranking_No1: assets("/lobby/ranking/no1.png"),
  Ranking_No2: assets("/lobby/ranking/no2.png"),
  Ranking_No3: assets("/lobby/ranking/no3.png"),
  Ranking_OtherNo: assets("/lobby/ranking/otherNo.png"),
  Ranking_Number0: assets("/lobby/ranking/0.png"),
  Ranking_Number4: assets("/lobby/ranking/4.png"),
  Ranking_Number5: assets("/lobby/ranking/5.png"),
  Ranking_Number6: assets("/lobby/ranking/6.png"),
  Ranking_Number7: assets("/lobby/ranking/7.png"),
  Ranking_Number8: assets("/lobby/ranking/8.png"),
  Ranking_Number9: assets("/lobby/ranking/9.png"),
};

const Login = {
  Login_Background: assets("/login/background.png"),
  Login_Logo: assets("/login/logo.png"),
  Login_Submit: assets("/login/submit-btn.png"),
  Login_Form: assets("/login/input-form.png"),
  Login_Spine: assets("/animation/login/skeleton.json"),
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
  Modal_Close: assets("/modal/close.png"),
  Modal_Frame_Information: assets("/modal/information_frame.png"),

  // Road
  Road_Frame: assets("/road/frame.png"),

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
  Sidebar_Information: assets("/sidebar/information.png"),
  Sidebar_Mail: assets("/sidebar/mail.png"),
  Sidebar_Menu: assets("/sidebar/menu.png"),
  Sidebar_Setting: assets("/sidebar/setting.png"),
  Sidebar_Stream: assets("/sidebar/stream.png"),

  // Fonts
  Font_Kai: assets("/fonts/kai.ttc"),

  // Setting
  Setting_Check: assets("/sidebar/setting/check.png"),
  Setting_Checkbox: assets("/sidebar/setting/checkbox.png"),
  Setting_Reset_Button: assets("/sidebar/setting/reset_button.png"),
  Setting_Volume_Bar: assets("/sidebar/setting/volume_bar.png"),
  Setting_Volume_Bottom: assets("/sidebar/setting/volume_bottom.png"),
  Setting_Volume_Controller: assets("/sidebar/setting/volume_controller.png"),

  Announcement_Background: assets("/sidebar/announcement/background.png"),
};

const Assets = {
  Common,
  Login,
  Lobby,
  Room,
};

export default Assets;
