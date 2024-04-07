import { create } from "zustand";
interface AuthState {
  logInEmail: string;
  logInPw: string;

  setLogInEmail: (title: string) => void;
  setLogInPw: (content: string) => void;
}
interface AuthAction {
  setLogInEmail: (logInEmail: string) => void;
  setLogInPw: (logInPw: string) => void;
}
const useAuthStore = create<AuthState & AuthAction>((set) => ({
  logInEmail: "",
  logInPw: "",
  setLogInEmail: (logInEmail: string) => set({ logInEmail }),
  setLogInPw: (logInPw: string) => set({ logInPw }),
}));

export default useAuthStore;
