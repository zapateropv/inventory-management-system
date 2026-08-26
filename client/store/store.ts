import { create } from "zustand";
import axios from 'axios'

interface User {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  birthdate: Date;
  username: string;
}

interface User_LogIn{
  email: string;
  username: string;
  password: string
}

type Store = {
  isAuthenticated: boolean;
  access_token: string | null;
  users: object | null;
  isCheckingAuth: boolean;
  register_add_user: (user:User) => Promise<void>;
  login: (user:User_LogIn) => Promise<void>;
  checkAuth: () => Promise<void>;
  refreshToken: () => Promise<string | null>;
};

export const useStore = create<Store>()((set, get) => ({
  isAuthenticated: false,
  access_token: null,
  users: null,
  isCheckingAuth: true,
  register_add_user: async ({firstName, lastName, password, email, birthdate, username}:User) => {
   
    try {
      await axios.post("http://localhost:8000/register", {
            first_name: firstName,
            last_name: lastName,
            password: password,
            email: email,
            birthdate: birthdate,
            username: username
      }, {withCredentials: true},
     )
    } catch (error) {
      alert(error)
    }
  },
  login: async ({email, username, password}:User_LogIn) => {
    try {
    const user = await axios.post("http://localhost:8000/login",
        {
          email: email,
          username: username,
          password: password
        },
        {withCredentials: true}
      )
      set({access_token: user.data.access_token, isAuthenticated: true})
    } catch (error) {
      alert(error)
    }
  },
checkAuth: async () => {
  set({ isCheckingAuth: true });

  try {
    const accessToken = await get().refreshToken();
    console.log(accessToken)
    const res = await axios.get(
      "http://localhost:8000/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        withCredentials: true
      }
    );

    set({
      isAuthenticated: true,
      users: res.data.user,
      isCheckingAuth: false
    });

  } catch (error) {
    set({
      isAuthenticated: false,
      users: null,
      access_token: null,
      isCheckingAuth: false
    });

    console.log("Not authenticated");
  }
},
refreshToken: async () => {
  try {
    const res = await axios.post(
      "http://localhost:8000/refresh",
      {},
      {
        withCredentials: true
      }
    );

    set({
      access_token: res.data.new_access_token
    });

    return res.data.new_access_token;

  } catch (error) {
    
    set({
      access_token: null,
      isAuthenticated: false
    });
     throw error
  }
}
}));