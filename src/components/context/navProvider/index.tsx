import { createContext, useContext } from "react";

export type NavContent = {
  numberPag: number;
  setNumberPag: (e: number) => void;
};

export const NavContext = createContext<NavContent>({
  numberPag: 0,
  setNumberPag: () => {},
});

export const useNavContext = () => useContext(NavContext);
