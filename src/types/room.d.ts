export interface RoomSessionResponse {
    roomId: string;
    roomStatus: string;
    playerId: string;
    playerToken: string;
    publicInviteUrl: string;
    privateReconnectUrl: string;
    recovered?: boolean;
}
export interface RoomSummary {
    id: string;
    status: string;
    hostPlayerId: string;
    rulesetVersion: string;
}
export interface LobbyPlayer {
    id: string;
    nickname: string;
    is_host: boolean;
    turn_order_index: number | null;
    connected: boolean;
}
export interface RoomStateResponse<TState = unknown> {
    room: RoomSummary;
    players: LobbyPlayer[];
    state: TState | null;
}
