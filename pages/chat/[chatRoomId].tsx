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
            <div className="w-1/4 flex justify-center my-auto">
              <IconButton onClick={() => router.push("/talk")}>
                <ArrowBackIosNewIcon color={"primary"} />
              </IconButton>
            </div>
            <div className="w-2/4 my-auto">
              <Typography color={"primary"} textAlign="center" variant="h5">
                {partnerUser.username}
              </Typography>
            </div>
            <div className="w-1/4" />
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

          <div className="bottom-0">
            <MessageField
              roomId={router.query.chatRoomId as string}
              uid={user.uid}
              sendText={useSendText}
            />
          </div>
        </div>
      ) : (
        <Box>しばらくお待ち下さい</Box>
      )}
    </>
  );
}
