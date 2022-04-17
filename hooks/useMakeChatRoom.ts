import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default async function useMakeChatRoom(): Promise<string> {
  const chatRoomRef = doc(collection(db, "chatrooms"));

  const initialChatRoom = {
    chatRoomId: chatRoomRef.id,
    created_at: Timestamp.now(),
  };

  await setDoc(chatRoomRef, initialChatRoom);

  return chatRoomRef.id;
}
