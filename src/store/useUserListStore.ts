import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "./useUserStore";

interface UserList {
    users: User[];
    setUsers: (users: User[]) => void;
    addUser: (user: User) => void;
    removeUserById: (userId: number) => void
    clearUsers: () => void;
}

export const useUserListStore = create<UserList>()(
    persist(
        (set) => ({
            users: [],
            setUsers: (users) => set({ users }),
            addUser: (user) => set((state) => ({ users: [...state.users, user] })),
            removeUserById: (id) => set((state) => ({
                users: state.users.filter((user) => user.id !== id),
            })),
            clearUsers: () => set({ users: [] }),
        }),
        {
            name: "user-list-store",
        }
    )
);
