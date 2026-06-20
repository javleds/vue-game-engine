export interface ChatMessageView {
  id: string
  roomId: string
  playerId: string
  nickname: string
  kind: 'chat' | 'activity'
  message: string
  createdAt: string
}
