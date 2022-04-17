import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { PertnerUser } from "../pages/chat/[chatRoomId]";

export default async function useGetUserData(
  uid: string
): Promise<PertnerUser> {
  const docRef = doc(db, "users", uid);

  const docSnap = await getDoc(docRef);

  const data = docSnap.data();

  return {
    uid: uid,
    username: data?.username,
    countries: data?.countries,
    image: data?.image,
  };
}
