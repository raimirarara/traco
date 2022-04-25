import { Box, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MessageField from "../../components/atoms/MessageField";
import ChatArea from "../../components/organizms/ChatArea";
import { db } from "../../firebase/firebase";
import useGetUserData from "../../hooks/useGetUserData";
import useSendText from "../../hooks/useSendText";
import { getUser } from "../../redux/slices/userSlice";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export type PertnerUser = {
  uid: string;
  username: string;
  countries: string[];
  image: {
    id: string;
    path: string;
  };
};

export default function ChatRoomId() {
  const user = useSelector(getUser).user;
  const [partnerUser, setPartnerUser] = useState<PertnerUser>();
  const router = useRouter();

  useEffect(() => {
    const currentRoom = user.chatRooms.filter(
      (chatRoom) => chatRoom.chatRoomId == router.query.chatRoomId
    );

    if (currentRoom.length > 0) {
      const getUserData = async () => {
        const a = await useGetUserData(currentRoom[0].chatPartnerUid);
        setPartnerUser(a);
      };
      getUserData();
    }
  }, [user]);

  return (
    <>
      {partnerUser ? (
        <div>
          <div className="w-full flex shadow-md bg-blue-50">
            <Box
              sx={{
                width: "25%",
                display: "flex",
                justifyContent: "center",
                justifyItems: "center",
              }}
            >
              <IconButton onClick={() => router.push("/talk")}>
                <ArrowBackIosNewIcon color={"primary"} />
              </IconButton>
            </Box>
            <Box
              sx={{
                width: "50%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                color={"primary"}
                textAlign="center"
                variant="h5"
                my="auto"
              >
                {partnerUser.username}
              </Typography>
            </Box>
            <Box sx={{ width: "25%" }} />
          </div>

          <ChatArea
            roomId={router.query.chatRoomId as string}
            currentUser={{
              uid: user.uid,
              name: user.username,
              image: user.image,
            }}
            partnerUser={partnerUser}
          />

          <Box sx={{ bottom: 0 }}>
            <MessageField
              roomId={router.query.chatRoomId as string}
              uid={user.uid}
              sendText={useSendText}
            />
          </Box>
        </div>
      ) : (
        <Box>しばらくお待ち下さい</Box>
      )}
    </>
  );
}
