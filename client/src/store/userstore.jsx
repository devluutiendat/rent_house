import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

const UserStore = create(persist(
  (set, get) => ({
    token: null,
    current: null,
    img: null,
    role: null,
    name:null,
    setCurrent: (current) => set({ current }),
    setName:(name) => set({name}),
    setToken: (token) => set({ token }),
    setImg: (img) => set({ img }),
    setRole: (role) => set({ role }) // Fixed this line
  }),
  {
    name: 'dat',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => 
      (Object.fromEntries(
        Object.entries(state).filter(
          ([key]) => key === 'token' || key === 'current' || key === 'img' || key === 'role' || key === 'name'
        )
      ))
  }
));

export default UserStore;
