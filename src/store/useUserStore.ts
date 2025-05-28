import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
    id: number;
    firstName: string;
    lastName?: string | null;
    email: string;
    profile?: string;
}

interface UserStore {
    user: User | null;
    isLoggedIn: boolean;
    login: (user: User) => void;
    logout: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            isLoggedIn: false,

            login: (user: User) =>
                set({
                    user: {
                        ...user,
                    },
                    isLoggedIn: true,
                }),

            logout: () => set({ user: null, isLoggedIn: false }),

        }),
        {
            name: "user-store",
            partialize: (state) => ({
                user: state.user,
                isLoggedIn: state.isLoggedIn,
            }),
        }
    )
);
