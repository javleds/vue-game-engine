interface RoomChannel {
    listen(event: string, callback: (payload: never) => void): RoomChannel;
}
interface RealtimeClient {
    channel(name: string): RoomChannel;
    leave(name: string): void;
}
export declare function configureTurnEngineRealtime(client: RealtimeClient): void;
export declare function roomRealtimeClient(): RealtimeClient;
export {};
