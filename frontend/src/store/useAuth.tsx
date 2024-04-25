import { create } from "zustand";
import axios from "../api/axios";

interface UserData {
  email: string;
  id: number;
  imgUrl: string;
  nickName: string;
}

interface AuthState {
  logInEmail: string;
  logInPw: string;
  updateCount: number;
  userName: string;
  levelName: string;
  setLogInEmail: (title: string) => void;
  setLogInPw: (content: string) => void;
  userData: () => Promise<UserData>;
}

interface AuthAction {
  setLogInEmail: (logInEmail: string) => void;
  setLogInPw: (logInPw: string) => void;
  setLevelName: (levelName: string) => void;
  setUpdateCount: (updateFn: (prev: number) => number) => void;
  setUserName: (userName: string) => void;
}
const useAuthStore = create<AuthState & AuthAction>((set) => ({
  logInEmail: "",
  logInPw: "",
  updateCount: 0,
  userName: "",
  levelName: "",
  setLogInEmail: (logInEmail: string) => set({ logInEmail }),
  setLogInPw: (logInPw: string) => set({ logInPw }),
  setUpdateCount: (updateFn: (prev: number) => number) => set((state: AuthState) => ({ updateCount: updateFn(state.updateCount) })),
  setUserName: (userName: string) => set({ userName }),
  setLevelName: (levelName: string) => set({ levelName }),
  userData: async () => {
    try {
      const response = await axios.get('/api/v1/user/myinfo/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log('유저 불러오기 에러', error);
      throw error;
    }
  }
}));

export default useAuthStore;
