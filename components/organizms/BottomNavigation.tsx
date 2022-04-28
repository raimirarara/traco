import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/slices/userSlice";
import { Avatar } from "@mui/material";
import { border } from "@mui/system";

export default function SimpleBottomNavigation() {
  const router = useRouter();
  const user = useSelector(getUser).user;

  const [value, setValue] = React.useState(
    router.pathname == "/"
      ? 2
      : router.pathname == "/mypage"
      ? 3
      : router.pathname == "/talk"
      ? 0
      : router.pathname == "/timeline"
      ? 1
      : null
  );

  return (
    <Box sx={{ width: "100%" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Talk"
          icon={<ChatIcon />}
          onClick={() => router.push("/talk")}
        />
        <BottomNavigationAction
          label="timeline"
          icon={<ViewTimelineIcon />}
          onClick={() => router.push("/timeline")}
        />
        <BottomNavigationAction
          label="Search"
          icon={<SearchIcon />}
          onClick={() => router.push("/")}
        />
        {user.image ? (
          <BottomNavigationAction
            label="MyPage"
            icon={
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  border: 1.5,
                  borderColor: "primary",
                }}
                src={user.image.path}
              />
            }
            onClick={() => router.push("/mypage")}
          />
        ) : (
          <BottomNavigationAction
            label="MyPage"
            icon={<AccountCircleIcon />}
            onClick={() => router.push("/mypage")}
          />
        )}
      </BottomNavigation>
    </Box>
  );
}
