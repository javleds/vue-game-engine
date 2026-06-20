import { bearer, http } from './http'
import type { ChatMessageView } from '../types/chat'

export type ChatMessageKind = ChatMessageView['kind']

export async function listChatMessages(
  roomId: string,
  token: string,
  kind: ChatMessageKind = 'chat',
): Promise<ChatMessageView[]> {
  const response = await http.get<{ messages: ChatMessageView[] }>(
    `/rooms/${roomId}/chat/messages`,
    { headers: bearer(token), params: { kind } },
  )

  return response.data.messages
}

export async function sendChatMessage(
  roomId: string,
  token: string,
  message: string,
): Promise<ChatMessageView> {
  const response = await http.post<{ message: ChatMessageView }>(
    `/rooms/${roomId}/chat/messages`,
    { message },
    { headers: bearer(token) },
  )

  return response.data.message
}
