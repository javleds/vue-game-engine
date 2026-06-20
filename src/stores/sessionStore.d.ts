import type { RoomSessionResponse } from '../types/room';
interface SessionState {
    roomId: string | null;
    playerId: string | null;
    playerToken: string | null;
    publicInviteUrl: string | null;
    privateReconnectUrl: string | null;
}
type StoredSessions = Record<string, SessionState>;
export declare const useSessionStore: import("pinia").StoreDefinition<"session", SessionState, {
    hasSession: (state: {
        roomId: string | null;
        playerId: string | null;
        playerToken: string | null;
        publicInviteUrl: string | null;
        privateReconnectUrl: string | null;
    } & import("pinia").PiniaCustomStateProperties<SessionState>) => boolean;
}, {
    restore(roomId: string): void;
    save(session: RoomSessionResponse): void;
    saveManual(session: SessionState): void;
    clear(roomId?: string | null): void;
    persistSession(session: SessionState): void;
    storedSessions(): StoredSessions;
    parseStoredSessions(): StoredSessions;
}>;
export {};
