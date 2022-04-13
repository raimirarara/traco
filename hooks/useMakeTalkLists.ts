import { db, FirebaseTimestamp } from "../firebase/firebase";
import useGetUserData from "./useGetUserData";

export type TalkLists = {
  username: string;
  image: {
    id: string;
    path: string;
  };
  latestTalk: {
    name: string;
    content: string;
    date: Date;
  };
}[];

export default async function useMakeTalkLists(
  chatRooms: {
    chatRoomId: string;
    chatPartnerUid: string;
  }[]
): Promise<TalkLists> {
  const talkLists: TalkLists = [];

  chatRooms.forEach(async (chatRoom) => {
    const pertnerUserData = await useGetUserData(chatRoom.chatPartnerUid);
    await db
      .collection("chatrooms")
      .doc(chatRoom.chatRoomId)
      .collection("messages")
      .orderBy("created_at", "desc")
      .limit(1)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          talkLists.push({
            username: pertnerUserData.username,
            image: pertnerUserData.image,
            latestTalk: {
              name: doc.data().name,
              content: doc.data().content,
              date: doc.data().created_at.toDate(),
            },
          });
        });
      });
  });

  return talkLists;
}
