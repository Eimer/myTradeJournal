export const UserAuthStatus = {
    waitAuth: 'wait-auth',
    loggedIn: 'logged-in',
    loggedOut: 'logged-out'
} as const;
export type UserAuthStatusType = typeof UserAuthStatus[keyof typeof UserAuthStatus];

export interface AppUser {
    id: string;
    email: string;
    displayName: string;
    avatarUrl?: string;
    status: UserAuthStatusType;
}
