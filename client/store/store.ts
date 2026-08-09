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

type Store = {
  isAuthenticated: boolean;
  access_token: string | null;
  users: object | null;
  register_add_user: () => Promise<void>;
};

export const useStore = create<Store>()((set) => ({
  isAuthenticated: false,
  access_token: null,
  users: null,
  register_add_user: async ({firstName, lastName, password, email, birthdate, username}:User) => {
    // Your logic here
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
      
    }
  },
}));