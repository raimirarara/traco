import { Box } from "@mui/system";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { db } from "../../firebase/firebase";
import firebase from "firebase/compat/app";
import { PertnerUser } from "../../pages/chat/[chatRoomId]";
import useGetWindowSize from "../../hooks/useGetWindowSize";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Avatar, Typography } from "@mui/material";
import useReturnCodeToBr from "../../hooks/useReturnCodeToBr";

type Props = {
  currentUser: {
    uid: string;
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
      uid: data.uid,
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
    setLogs((prev) => [...prev, { ...log }]);
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

  useEffect(() => {
    console.log(logs);
  }, [logs]);

  return (
    <Box height={height - 96} className={"overflow-scroll"}>
      {logs.map((log: firebase.firestore.DocumentData, index: number) => (
        <>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {logs.length == 1 && (
              <Typography
                sx={{
                  mt: 2,
                  mb: 0.5,
                  px: 2,
                  textAlign: "center",
                  borderRadius: "30px",
                  bgcolor: "rgb(237 235 235)",
                  boxShadow:
                    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                }}
              >
                {log.date}
              </Typography>
            )}
            {logs.length > 1 && logs[index].date != logs[index - 1]?.date && (
              <Typography
                sx={{
                  mt: 2,
                  mb: 0.5,
                  px: 2,
                  textAlign: "center",
                  borderRadius: "30px",
                  bgcolor: "rgb(237 235 235)",
                  boxShadow:
                    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                }}
              >
                {log.date}
              </Typography>
            )}
          </Box>
          <div>
            {log.uid == props.currentUser.uid ? (
              <div className="flex">
                <div className="w-1/3" />
                <div className="w-2/3 flex justify-end">
                  <div className="mt-auto mb-3 text-xs">{log.time}</div>
                  <Typography
                    sx={{
                      my: 0.5,
                      mx: 1,
                      py: 1,
                      px: 2,
                      borderRadius: "30px",
                      bgcolor: "rgb(191 219 254)",
                      boxShadow:
                        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                    }}
                  >
                    {useReturnCodeToBr(log.content)}
                  </Typography>
                </div>
              </div>
            ) : (
              <div className="flex">
                <div className="w-2/3 flex justify-start">
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      marginLeft: 1,
                      marginY: "auto",
                    }}
                    src={props.partnerUser.image.path}
                  />
                  <Typography
                    sx={{
                      my: 0.5,
                      mx: 1,
                      py: 1,
                      px: 2,
                      borderRadius: "30px",
                      bgcolor: "rgb(217 249 157)",
                      boxShadow:
                        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                    }}
                  >
                    {useReturnCodeToBr(log.content)}
                  </Typography>
                  <div className="mt-auto mb-3 text-xs">{log.time}</div>
                </div>
                <div className="w-1/3" />
              </div>
            )}
          </div>
        </>
      ))}
      <div ref={scrollBottomRef} />
    </Box>
  );
}
