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
          <div className="flex shadow-md bg-blue-50">
            <div className="w-16 flex justify-center my-auto">
              <IconButton onClick={() => router.push("/favorite")}>
                <ArrowBackIosNewIcon color={"primary"} />
              </IconButton>
            </div>
            <Typography
              width={390}
              color={"primary"}
              textAlign="center"
              variant="h5"
              marginY={"auto"}
            >
              {partnerUser.username}
            </Typography>
            <div className="w-16" />
          </div>
          <ChatArea
            roomId={router.query.chatRoomId as string}
            currentUser={{ name: user.username, image: user.image }}
            partnerUser={partnerUser}
          />
          <div className="absolute inset-x-0 bottom-0">
            <MessageField
              roomId={router.query.chatRoomId as string}
              name={user.username}
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
