import type { ChatMessageView } from '../types/chat';
export type ChatMessageKind = ChatMessageView['kind'];
export declare function listChatMessages(roomId: string, token: string, kind?: ChatMessageKind): Promise<ChatMessageView[]>;
export declare function sendChatMessage(roomId: string, token: string, message: string): Promise<ChatMessageView>;
