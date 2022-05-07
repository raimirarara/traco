import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { TimelineLists } from "../../hooks/useMakeTimelineList";
import Image from "next/image";
import { Box } from "@mui/system";
import useReturnCodeToBr from "../../hooks/useReturnCodeToBr";
import useGetWindowSize from "../../hooks/useGetWindowSize";

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
  const { width, height } = useGetWindowSize();

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {props.timelineList.map((timelines) => (
        <div key={timelines.timelineId}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={timelines.username} src={timelines.userImage.path} />
            </ListItemAvatar>

            <ListItemText
              primary={
                <Box sx={{ display: "flex" }}>
                  <Typography>{timelines.username}</Typography>
                  <Typography
                    sx={{ ml: "auto" }}
                    variant="caption"
                    display="block"
                  >
                    {(
                      "0" +
                      (timelines.created_at.toDate().getMonth() + 1)
                    ).slice(-2) +
                      "/" +
                      ("0" + timelines.created_at.toDate().getDate()).slice(
                        -2
                      ) +
                      " " +
                      ("0" + timelines.created_at.toDate().getHours()).slice(
                        -2
                      ) +
                      ":" +
                      ("0" + timelines.created_at.toDate().getMinutes()).slice(
                        -2
                      )}
                  </Typography>
                </Box>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      pr: "56px",
                    }}
                    textAlign={"center"}
                    variant="body2"
                    color="text.primary"
                  >
                    {useReturnCodeToBr(timelines.timeline.content)}
                  </Typography>
                  {/* {" — " + talkList.latestTalk.content} */}
                </React.Fragment>
              }
            />
          </ListItem>
          <Box
            sx={{
              display: "row",
            }}
          >
            {timelines.timeline.images.length > 0 &&
              timelines.timeline.images.map((image) => (
                <Box
                  maxWidth={width / 2}
                  mb={3}
                  sx={{
                    mx: "auto",
                  }}
                >
                  <Image
                    id={image.id}
                    width={image.width ? image.width : 200}
                    height={image.height ? image.height : 200}
                    src={image.path}
                  />
                </Box>
              ))}
          </Box>
          <Divider variant="fullWidth" component="li" />
        </div>
      ))}
    </List>
  );
}
