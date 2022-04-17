import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const useSendText = async (
  roomId: string,
  name: string,
  content: string
): Promise<void> => {
  await addDoc(collection(db, "chatrooms", roomId, "messages"), {
    name: name,
    content: content,
    created_at: Timestamp.now(),
  });
};
export default useSendText;
