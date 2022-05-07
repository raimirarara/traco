import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import SimpleBottomNavigation from "../components/organizms/BottomNavigation";
import useMakeTalkLists, { TalkLists } from "../hooks/useMakeTalkLists";
import { getUser } from "../redux/slices/userSlice";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TimelineList from "../components/organizms/TimelineList";
import { useRouter } from "next/router";
import useMakeTimeLineList, {
  TimelineLists,
} from "../hooks/useMakeTimelineList";

export default function Timeline() {
  const user = useSelector(getUser).user;
  const router = useRouter();

  const [timelineList, setTimelineList] = useState<TimelineLists>([]);

  useEffect(() => {
    useMakeTimeLineList().then((timelineList) =>
      setTimeout(() => setTimelineList(timelineList), 700)
    );
  }, []);

  useEffect(() => {
    console.log(timelineList);
  }, [timelineList]);
  return (
    <div>
      <Box>
        <Typography color={"primary"} align="center" variant="h5" pt={2}>
          Timeline
        </Typography>

        <TimelineList
          currentUser={{
            uid: user.uid,
            username: user.username,
            image: user.image,
          }}
          timelineList={timelineList}
        />
        <IconButton
          sx={{ position: "fixed", right: 2, bottom: 65 }}
          onClick={() => router.push("/post")}
        >
          <AddCircleIcon sx={{ width: 45, height: 45 }} color="primary" />
        </IconButton>
      </Box>
      <div className="w-full fixed bottom-0">
        <SimpleBottomNavigation />
      </div>
    </div>
  );
}
