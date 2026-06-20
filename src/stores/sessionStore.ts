import { defineStore } from 'pinia'

import type { RoomSessionResponse } from '../types/room'

const STORAGE_KEY = 'turn-engine.sessions'

interface SessionState {
  roomId: string | null
  playerId: string | null
  playerToken: string | null
  publicInviteUrl: string | null
  privateReconnectUrl: string | null
}

type StoredSessions = Record<string, SessionState>

export const useSessionStore = defineStore('session', {
  state: (): SessionState => ({
    roomId: null,
    playerId: null,
    playerToken: null,
    publicInviteUrl: null,
    privateReconnectUrl: null,
  }),
  getters: {
    hasSession: (state): boolean => Boolean(state.roomId && state.playerId && state.playerToken),
  },
  actions: {
    restore(roomId: string): void {
      const session = this.storedSessions()[roomId]

      if (!session) {
        return
      }

      this.$patch(session)
    },
    save(session: RoomSessionResponse): void {
      const state: SessionState = {
        roomId: session.roomId,
        playerId: session.playerId,
        playerToken: session.playerToken,
        publicInviteUrl: session.publicInviteUrl,
        privateReconnectUrl: session.privateReconnectUrl,
      }

      this.persistSession(state)
    },
    saveManual(session: SessionState): void {
      this.persistSession(session)
    },
    clear(roomId?: string | null): void {
      const targetRoomId = roomId ?? this.roomId

      if (targetRoomId) {
        const sessions = this.storedSessions()
        delete sessions[targetRoomId]
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
      }

      if (!targetRoomId || this.roomId === targetRoomId) {
        this.$reset()
      }

    },
    persistSession(session: SessionState): void {
      if (!session.roomId) {
        return
      }

      const sessions = this.storedSessions()
      sessions[session.roomId] = session
      this.$patch(session)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
    },
    storedSessions(): StoredSessions {
      return this.parseStoredSessions()
    },
    parseStoredSessions(): StoredSessions {
      const raw = window.localStorage.getItem(STORAGE_KEY)

      if (!raw) {
        return {}
      }

      try {
        return JSON.parse(raw) as StoredSessions
      } catch {
        return {}
      }
    },
  },
})
