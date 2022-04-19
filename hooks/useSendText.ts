import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useSendText = async (
  roomId: string,
  uid: string,
  content: string
): Promise<void> => {
  await addDoc(collection(db, "chatrooms", roomId, "messages"), {
    uid: uid,
    content: content,
    created_at: Timestamp.now(),
  });
};
export default useSendText;
