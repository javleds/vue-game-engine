interface RoomStateChangedEvent {
    roomId: string;
    stateVersion: number;
}
interface RoomChatMessageCreatedEvent {
    roomId: string;
    messageId: string;
}
export declare function useRoomRealtime(roomId: string, handlers: {
    onStateChanged?: (event: RoomStateChangedEvent) => void | Promise<void>;
    onChatMessageCreated?: (event: RoomChatMessageCreatedEvent) => void | Promise<void>;
}): void;
export {};
