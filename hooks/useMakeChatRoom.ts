import { db, FirebaseTimestamp } from "../firebase/firebase";

export default async function useMakeChatRoom(): Promise<string> {
  const chatRoomRef = await db.collection("chatrooms").doc();
  const timestamp = FirebaseTimestamp.now();

  const initialChatRoom = {
    chatRoomId: chatRoomRef.id,
    messages: {},
    created_at: timestamp,
  };

  await chatRoomRef.set(initialChatRoom);

  return chatRoomRef.id;
}
