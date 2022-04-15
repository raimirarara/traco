import { Box, Typography } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import SimpleBottomNavigation from "../components/organizms/BottomNavigation";
import TalkList from "../components/organizms/TalkList";
import useMakeTalkLists, { TalkLists } from "../hooks/useMakeTalkLists";
import { getUser } from "../redux/slices/userSlice";

export default function Talk() {
  const user = useSelector(getUser).user;

  const [talkLists, setTalkLists] = useState<TalkLists>([]);

  useEffect(() => {
    useMakeTalkLists(user.chatRooms).then((talkLists) => {
      setTimeout(() => setTalkLists(talkLists), 300);
      console.log(talkLists);
    });
  }, [user]);

  return (
    <div>
      <Box>
        <Typography color={"primary"} align="center" variant="h5" pt={2}>
          Talk
        </Typography>

        <TalkList talkLists={talkLists} />
      </Box>
      <div className="w-full fixed bottom-0">
        <SimpleBottomNavigation />
      </div>
    </div>
  );
}
