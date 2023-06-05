import { atom } from 'recoil';

export const LoggedInAtom = atom({
  key: "isLoggedIn",
  default: false,
})

export const IsAdmin = atom({
  key: "isAdmin",
  default: false,
})