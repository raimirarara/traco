import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/router";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(1);
  const router = useRouter();

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
          label="Favorite"
          icon={<FavoriteIcon />}
          onClick={() => router.push("/favorite")}
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
