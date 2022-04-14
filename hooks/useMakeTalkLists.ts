import { db, FirebaseTimestamp } from "../firebase/firebase";
import useGetUserData from "./useGetUserData";

export type TalkLists = {
  chatRoomId: string;
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

export default function useMakeTalkLists(
  chatRooms: {
    chatRoomId: string;
    chatPartnerUid: string;
  }[]
): TalkLists {
  const talkLists: TalkLists = [];

  chatRooms.forEach(async (chatRoom) => {
    const pertnerUserData = await useGetUserData(chatRoom.chatPartnerUid);
    console.log("Get userData!!");
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
            chatRoomId: chatRoom.chatRoomId,
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
    console.log("Get talkLists");
  });

  return talkLists;
}
