import {
  Avatar,
  Box,
  Button,
  IconButton,
  MenuList,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleBottomNavigation from "../../components/organizms/BottomNavigation";
import { getUser, signOutUser } from "../../redux/slices/userSlice";
import MenuIcon from "@mui/icons-material/Menu";
import MenuListComposition from "../../components/organizms/MenuListComposition";
import Image from "next/image";

export default function MyPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(getUser).user;

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      <Box>
        <div className="flex">
          <Box width={"20%"} />
          <Box width={"60%"}>
            <Box height={16} />
            <Typography color={"primary"} align="center" variant="h5">
              マイページ
            </Typography>
          </Box>
          <Box className={"flex justify-end"} width={"20%"} pt={1} pr={2}>
            {/* <IconButton>
              <MenuIcon />
            </IconButton> */}
            <MenuListComposition />
          </Box>
        </div>
        <Typography color={"primary"} align="center" variant="h5" mt={4}>
          現在ログインしているユーザー
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }} my={2}>
          <Avatar sx={{ width: 80, height: 80 }} src={user.image.path} />
        </Box>
        <Typography align="center" variant="h6">
          {user.username}
        </Typography>
        <Typography color={"primary"} align="center" variant="h5" mt={4}>
          登録しているメールアドレス
        </Typography>
        <Box>
          <Button color="error">メールアドレスの確認が済んでいません。</Button>
        </Box>

        <Typography align="center" variant="h6">
          {user.email}
        </Typography>
        <Typography color={"primary"} align="center" variant="h5" mt={4}>
          国
        </Typography>
        <Typography align="center" variant="h6">
          {user.countries &&
            user.countries.map((country) => <p key={country}>{country}</p>)}
        </Typography>
      </Box>
      <div className="w-full fixed bottom-0">
        <SimpleBottomNavigation />
      </div>
    </div>
  );
}
