import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { imageConfigDefault } from "next/dist/server/image-config";
import { db } from "../firebase/firebase";
import Uid from "../pages/users/[uid]";
import useGetUserData from "./useGetUserData";

export type TimelineLists = {
  timelineId: string;
  uid: string;
  username: string;
  userImage: {
    id: string;
    path: string;
  };
  timeline: {
    content: string;
    images: {
      id: string;
      path: string;
    }[];
  };
}[];

export default async function useMakeTimeLineList(): Promise<TimelineLists> {
  const timelineList: TimelineLists = [];

  const q = query(
    collection(db, "timelines"),
    orderBy("created_at", "desc"),
    limit(10)
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (doc) => {
    useGetUserData(doc.data().uid).then((user) => {
      timelineList.push({
        timelineId: doc.data().timelineId,
        uid: user.uid,
        username: user.username,
        userImage: user.image,
        timeline: {
          content: doc.data().content,
          images: doc.data().images,
        },
      });
    });
  });

  return timelineList;
}
