interface RoomChannel {
  listen(event: string, callback: (payload: never) => void): RoomChannel
}

interface RealtimeClient {
  channel(name: string): RoomChannel
  leave(name: string): void
}

let realtimeClient: RealtimeClient | null = null

export function configureTurnEngineRealtime(client: RealtimeClient): void {
  realtimeClient = client
}

export function roomRealtimeClient(): RealtimeClient {
  if (!realtimeClient) {
    throw new Error('Turn engine realtime client has not been configured.')
  }

  return realtimeClient
}
