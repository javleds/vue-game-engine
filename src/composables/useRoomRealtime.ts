import { onBeforeUnmount } from 'vue'

import { roomRealtimeClient } from '../realtime/realtimeClient'

interface RoomStateChangedEvent {
  roomId: string
  stateVersion: number
}

interface RoomChatMessageCreatedEvent {
  roomId: string
  messageId: string
}

export function useRoomRealtime(
  roomId: string,
  handlers: {
    onStateChanged?: (event: RoomStateChangedEvent) => void | Promise<void>
    onChatMessageCreated?: (event: RoomChatMessageCreatedEvent) => void | Promise<void>
  },
): void {
  const echo = roomRealtimeClient()
  const channel = echo.channel(`room.${roomId}`)

  channel.listen('.room.state.changed', (event: RoomStateChangedEvent) => {
    void handlers.onStateChanged?.(event)
  })
  channel.listen('.room.chat.message.created', (event: RoomChatMessageCreatedEvent) => {
    void handlers.onChatMessageCreated?.(event)
  })

  onBeforeUnmount(() => {
    echo.leave(`room.${roomId}`)
  })
}
