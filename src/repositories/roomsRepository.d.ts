import type { RoomSessionResponse, RoomStateResponse } from '../types/room';
export declare function createRoom(nickname: string): Promise<RoomSessionResponse>;
export declare function joinRoom(roomId: string, nickname: string): Promise<RoomSessionResponse>;
export declare function getRoomState<TState = unknown>(roomId: string, token: string): Promise<RoomStateResponse<TState>>;
export declare function startRoomGame(roomId: string, token: string): Promise<unknown>;
export declare function leaveRoom(roomId: string, token: string): Promise<unknown>;
export declare function disconnectRoom(roomId: string, token: string): Promise<unknown>;
export declare function disconnectRoomKeepalive(roomId: string, token: string): void;
