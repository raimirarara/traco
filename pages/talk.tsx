import { Box, Button, Typography } from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import SimpleBottomNavigation from "../components/organizms/BottomNavigation";
import TalkList from "../components/organizms/TalkList";
import useMakeTalkLists, { TalkLists } from "../hooks/useMakeTalkLists";

import { getUser } from "../redux/slices/userSlice";

export default function Talk() {
  const user = useSelector(getUser).user;

  const [talkLists, setTalkLists] = useState<TalkLists>([]);
  async function makeTalkList() {
    setTalkLists(await useMakeTalkLists(user.chatRooms));
  }
  useEffect(() => {
    makeTalkList();
  }, [user]);
  return (
    <Box>
      <Box height={680}>
        <Typography color={"primary"} align="center" variant="h5" pt={2}>
          Talk
        </Typography>
        <TalkList talkLists={talkLists} />
      </Box>
      <SimpleBottomNavigation />
    </Box>
  );
}
