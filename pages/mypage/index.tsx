import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, signOutUser } from "../../redux/slices/userSlice";

export default function MyPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(getUser).user;

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Box>
      <Typography color={"primary"} align="center" variant="h5" mt={2}>
        マイページ
      </Typography>
      <Typography color={"primary"} align="center" variant="h5" mt={4}>
        現在ログインしているユーザー
      </Typography>
      <Typography align="center" variant="h6">
        {user.username}
      </Typography>
      <Typography color={"primary"} align="center" variant="h5" mt={4}>
        登録しているメールアドレス
      </Typography>
      <Typography align="center" variant="h6">
        {user.email}
      </Typography>
      <Typography color={"primary"} align="center" variant="h5" mt={4}>
        国
      </Typography>
      <Typography align="center" variant="h6">
        {user.countries && user.countries.map((country) => <p>{country}</p>)}
      </Typography>
      <Button
        className="absolute inset-x-0 bottom-20"
        fullWidth
        variant="outlined"
        href="/mypage/edit"
      >
        Profile Edit
      </Button>
      <Button
        className="absolute inset-x-0 bottom-10"
        fullWidth
        variant="outlined"
        href="/"
      >
        Home
      </Button>
      <Button
        className="absolute inset-x-0 bottom-0"
        fullWidth
        variant="outlined"
        onClick={() => dispatch(signOutUser())}
      >
        Sign Out
      </Button>
    </Box>
  );
}
