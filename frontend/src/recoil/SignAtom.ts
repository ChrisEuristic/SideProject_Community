import { atom } from 'recoil';

export const LoggedInAtom = atom({
  key: "isLoggedIn",
  default: false,
})