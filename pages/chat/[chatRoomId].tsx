import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MessageField from "../../components/atoms/MessageField";
import ChatArea from "../../components/organizms/ChatArea";
import { db } from "../../firebase/firebase";
import useGetUserData from "../../hooks/useGetUserData";
import useSendText from "../../hooks/useSendText";
import { getUser } from "../../redux/slices/userSlice";

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
        <Box>
          <Typography color={"primary"} align="center" variant="h5" mt={2}>
            {partnerUser.username}
          </Typography>
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
        </Box>
      ) : (
        <Box>しばらくお待ち下さい</Box>
      )}
    </>
  );
}
