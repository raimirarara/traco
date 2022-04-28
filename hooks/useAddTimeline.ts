import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

type Props = {
  uid: string;
  content: string;
  images: {
    id: string;
    path: string;
  }[];
};

export default async function useAddTimeline(props: Props) {
  const timeLineRef = doc(collection(db, "timelines"));

  const timelineData = {
    timelineId: timeLineRef.id,
    created_at: Timestamp.now(),
    uid: props.uid,
    content: props.content,
    images: props.images,
  };

  await setDoc(timeLineRef, timelineData);
}
