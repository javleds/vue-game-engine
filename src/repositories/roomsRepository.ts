import { bearer, http } from './http'
import type { RoomSessionResponse, RoomStateResponse } from '../types/room'

export async function createRoom(nickname: string): Promise<RoomSessionResponse> {
  const response = await http.post<RoomSessionResponse>('/rooms', { nickname })

  return response.data
}

export async function joinRoom(roomId: string, nickname: string): Promise<RoomSessionResponse> {
  const response = await http.post<RoomSessionResponse>(`/rooms/${roomId}/join`, { nickname })

  return response.data
}

export async function getRoomState<TState = unknown>(
  roomId: string,
  token: string,
): Promise<RoomStateResponse<TState>> {
  const response = await http.get<RoomStateResponse<TState>>(`/rooms/${roomId}/state`, {
    headers: bearer(token),
  })

  return response.data
}

export async function startRoomGame(roomId: string, token: string): Promise<unknown> {
  const response = await http.post<unknown>(`/rooms/${roomId}/start`, {}, {
    headers: bearer(token),
  })

  return response.data
}

export async function leaveRoom(roomId: string, token: string): Promise<unknown> {
  const response = await http.post<unknown>(`/rooms/${roomId}/leave`, {}, {
    headers: bearer(token),
  })

  return response.data
}

export async function disconnectRoom(roomId: string, token: string): Promise<unknown> {
  const response = await http.post<unknown>(`/rooms/${roomId}/disconnect`, {}, {
    headers: bearer(token),
  })

  return response.data
}

export function disconnectRoomKeepalive(roomId: string, token: string): void {
  void fetch(`/api/rooms/${roomId}/disconnect`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    keepalive: true,
  })
}
