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

type Props = {
  talkLists: TalkLists;
};

export default function TalkList(props: Props) {
  const router = useRouter();

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {props.talkLists.map((talkList) => (
        <div key={talkList.chatRoomId}>
          <ListItem
            alignItems="flex-start"
            onClick={() => router.push("/chat/" + talkList.chatRoomId)}
          >
            <ListItemAvatar>
              <Avatar
                alt={talkList.username}
                // src="/static/images/avatar/1.jpg"
              />
            </ListItemAvatar>

            <ListItemText
              primary={talkList.username}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {talkList.latestTalk.name}
                  </Typography>
                  {" — " + talkList.latestTalk.content}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ))}
    </List>
  );
}
