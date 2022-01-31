import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUser, signOutUser } from "../redux/slices/userSlice";

export default function MyPage() {
  const dispatch = useDispatch();
  const user = useSelector(getUser).user;

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
