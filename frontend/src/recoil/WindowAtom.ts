import { atom } from 'recoil';

export enum SlideWindowState {
  CLOSE, OPEN, FIXED
}

export const IsOnChatting = atom({
  key: "isOnChatting",
  default: SlideWindowState.CLOSE,
})

export const IsOnFriendBar = atom({
  key: "isOnFriendBar",
  default: SlideWindowState.CLOSE,
})