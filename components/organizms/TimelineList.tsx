import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { TalkLists } from "../../hooks/useMakeTalkLists";
import { useRouter } from "next/router";
import { Button, IconButton, TextField } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { Box } from "@mui/system";
import { storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDispatch } from "react-redux";
import useAddTimeLine from "../../hooks/useAddTimeline";
import { TimelineLists } from "../../hooks/useMakeTimelineList";
import Image from "next/image";

type Props = {
  currentUser: {
    uid: string;
    username: string;
    image: {
      id: string;
      path: string;
    };
  };
  timelineList: TimelineLists;
};

export default function TimelineList(props: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {props.timelineList.map((timelines) => (
        <div key={timelines.timelineId}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={timelines.username} src={timelines.userImage.path} />
            </ListItemAvatar>

            <ListItemText
              primary={timelines.username}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {timelines.timeline.content}
                  </Typography>
                  {/* {" — " + talkList.latestTalk.content} */}
                </React.Fragment>
              }
            />
            {timelines.timeline.images.length > 0 &&
              timelines.timeline.images.map((image) => (
                <Image
                  id={image.id}
                  width={100}
                  height={100}
                  src={image.path}
                />
              ))}
          </ListItem>
          <Divider variant="fullWidth" component="li" />
        </div>
      ))}
    </List>
  );
}
