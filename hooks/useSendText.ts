import {
  db,
  FirebaseFieldValue,
  FirebaseTimestamp,
} from "../firebase/firebase";

const useSendText = async (
  roomId: string,
  name: string,
  content: string
): Promise<void> => {
  const timestamp = FirebaseTimestamp.now();
  await db.collection("chatrooms").doc(roomId).collection("messages").add({
    name: name,
    content: content,
    created_at: timestamp,
  });
};
export default useSendText;
