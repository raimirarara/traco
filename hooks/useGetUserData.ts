import { db } from "../firebase/firebase";
import { PertnerUser } from "../pages/chat/[chatRoomId]";

export default async function useGetUserData(
  uid: string
): Promise<PertnerUser> {
  let pertnerUserData = {
    uid: uid,
    username: "",
    countries: [],
    image: {
      id: "",
      path: "",
    },
  };

  await db
    .collection("users")
    .doc(uid)
    .get()
    .then((doc) => {
      pertnerUserData = {
        uid: uid,
        username: doc.data()?.username,
        countries: doc.data()?.countries,
        image: doc.data()?.image,
      };
    });

  return pertnerUserData;
}
