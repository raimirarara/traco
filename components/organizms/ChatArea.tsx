import { Box } from "@mui/system";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { db } from "../../firebase/firebase";
import firebase from "firebase/compat/app";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import { PertnerUser } from "../../pages/chat/[chatRoomId]";
import useGetWindowSize from "../../hooks/useGetWindowSize";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

type Props = {
  currentUser: {
    name: string;
    image: {
      id: string;
      path: string;
    };
  };
  partnerUser: PertnerUser;
  roomId: string;
};

export default function ChatArea(props: Props) {
  const [logs, setLogs] = useState<firebase.firestore.DocumentData[]>([]);
  const scrollBottomRef = useRef<HTMLDivElement>(null);
  const { height, width } = useGetWindowSize();

  const addLog = (id: string, data: any) => {
    const log = {
      key: id,
      name: data.name,
      content: data.content,
      date:
        data.created_at.toDate().getFullYear() +
        "/" +
        ("0" + (data.created_at.toDate().getMonth() + 1)).slice(-2) +
        "/" +
        ("0" + data.created_at.toDate().getDate()).slice(-2),
      time:
        ("0" + data.created_at.toDate().getHours()).slice(-2) +
        ":" +
        ("0" + data.created_at.toDate().getMinutes()).slice(-2),
    };
    setLogs((prev) => [...prev, log]);
    scrollBottomRef?.current?.scrollIntoView();
  };

  useEffect(() => {
    const q = query(
      collection(db, "chatrooms", props.roomId, "messages"),
      orderBy("created_at", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("add", change.doc.data());
          addLog(change.doc.id, change.doc.data());
        }
        if (change.type === "modified") {
          console.log("Modified city: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed city: ", change.doc.data());
        }
      });
    });

    // Stop listening to changes
    return () => unsubscribe();
  }, []);

  return (
    <Box height={height - 96} className={"overflow-scroll"}>
      {logs.map((log) =>
        log.name == props.currentUser.name ? (
          <div className="flex">
            <div className="w-1/3" />
            <div className="w-2/3 flex justify-end">
              <div className="mt-auto mb-3 text-xs">{log.time}</div>
              <p
                className={
                  "my-1 mx-2  py-2 px-4 rounded-full bg-blue-200 shadow-md"
                }
              >
                {log.content}
              </p>
              <div className="my-auto">
                <PersonIcon />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex">
            <div className="w-2/3 flex justify-start">
              <div className="my-auto">
                <PersonIcon />
              </div>

              <p
                className={
                  "my-1 mx-2  py-2 px-4 rounded-full bg-green-200 shadow-md"
                }
              >
                {log.content}
              </p>
              <div className="mt-auto mb-3 text-xs">{log.time}</div>
              <div className="w-1/3" />
            </div>
          </div>
        )
      )}
      <div ref={scrollBottomRef} />
    </Box>
  );
}
