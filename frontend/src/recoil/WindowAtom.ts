import { atom } from 'recoil';

export enum SlideWindowState {
  INIT, CLOSE, OPEN, FIXED
}

export const IsOnChatting = atom({
  key: "isOnChatting",
  default: SlideWindowState.CLOSE,
})

export const IsOnFriendBar = atom({
  key: "isOnFriendBar",
  default: SlideWindowState.CLOSE,
})

export const IsOnProfilePopup = atom({
  key: "isOnProfilePopup",
  default: SlideWindowState.INIT,
})