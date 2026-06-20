import { onMounted, onUnmounted } from 'vue'

import { disconnectRoomKeepalive } from '../repositories/roomsRepository'

export function useRoomConnectionLifecycle(roomId: string, token: () => string | null): void {
  function notifyDisconnect(): void {
    const playerToken = token()

    if (!playerToken) {
      return
    }

    disconnectRoomKeepalive(roomId, playerToken)
  }

  onMounted(() => {
    window.addEventListener('pagehide', notifyDisconnect)
  })

  onUnmounted(() => {
    window.removeEventListener('pagehide', notifyDisconnect)
  })
}
