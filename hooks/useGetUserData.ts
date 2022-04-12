import { db } from "../firebase/firebase";
import { PertnerUser } from "../pages/chat/[chatRoomId]";

export default async function useGetUserData(
  uid: string
): Promise<PertnerUser> {
  const data: any = await (await db.collection("users").doc(uid).get()).data();

  return {
    uid: uid,
    username: data.username,
    countries: data.countries,
    image: {
      id: data.image.id,
      path: data.image.path,
    },
  };
}
