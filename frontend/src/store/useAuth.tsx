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

  setLogInEmail: (title: string) => void;
  setLogInPw: (content: string) => void;
  userData: () => Promise<UserData>;
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
