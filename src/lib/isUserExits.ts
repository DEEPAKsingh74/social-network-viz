import type { User } from "../store/useUserStore";

export const isUserExists = (email: string, users: User[]): boolean => {
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
};
