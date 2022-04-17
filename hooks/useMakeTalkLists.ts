import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
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

export default async function useMakeTalkLists(
  chatRooms: {
    chatRoomId: string;
    chatPartnerUid: string;
  }[]
): Promise<TalkLists> {
  const talkLists: TalkLists = [];

  await chatRooms.forEach((chatRoom) => {
    useGetUserData(chatRoom.chatPartnerUid).then(async (partnerUserData) => {
      console.log("get partnerUserData!!!");

      const q = query(
        collection(db, "chatrooms", chatRoom.chatRoomId, "messages"),
        orderBy("created_at", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log("get latestTalkData!!!");
        talkLists.push({
          chatRoomId: chatRoom.chatRoomId,
          username: partnerUserData.username,
          image: partnerUserData.image,
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
