import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default async function useGetUidFromName(name: string): Promise<string> {
  let uid = "";

  const q = query(collection(db, "users"), where("username", "==", name));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    if (doc.data().username == name) {
      uid = doc.data().uid;
    }
  });

  return uid;
}
