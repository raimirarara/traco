import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/router";

export default function SimpleBottomNavigation() {
  const router = useRouter();

  const [value, setValue] = React.useState(
    router.pathname == "/" ? 1 : router.pathname == "/mypage" ? 2 : 0
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
          label="Search"
          icon={<SearchIcon />}
          onClick={() => router.push("/")}
        />
        <BottomNavigationAction
          label="MyPage"
          icon={<AccountCircleIcon />}
          onClick={() => router.push("/mypage")}
        />
      </BottomNavigation>
    </Box>
  );
}
