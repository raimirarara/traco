import { db } from "../firebase/firebase";

export default async function useGetUidFromName(name: string): Promise<string> {
  let uid = "";

  const querySnapshot = await db
    .collection("users")
    .where("username", "==", name)
    .get();

  querySnapshot.forEach((docSnapShot) => {
    if (docSnapShot.data().username === name) {
      uid = docSnapShot.data().uid;
    }
  });

  return uid;
}
