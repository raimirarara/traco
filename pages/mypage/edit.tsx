import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCounrty, getUser } from "../../redux/slices/userSlice";

const countries = [
  {
    value: "韓国",
  },
  {
    value: "台湾",
  },
  {
    value: "ミャンマー",
  },
  {
    value: "タイ",
  },
  {
    value: "ベトナム",
  },
  {
    value: "フィリピン",
  },
  {
    value: "マレーシア",
  },
  {
    value: "シンガポール",
  },
  {
    value: "インドネシア",
  },
];

export default function ProfileEdit() {
  const dispatch = useDispatch();
  const user = useSelector(getUser).user;

  const [country, setCountry] = useState(user.country);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
    dispatch(editCounrty({ uid: user.uid, country: event.target.value }));
  };
  return (
    <Box>
      <Typography color={"primary"} align="center" variant="h5" mt={2}>
        Profile Edit
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
      <TextField
        id="select-country"
        select
        label="Country"
        value={country}
        onChange={handleChange}
        helperText="Please select your country"
      >
        {countries.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
      <Button
        className="absolute inset-x-0 bottom-10"
        fullWidth
        variant="outlined"
        href="/mypage"
      >
        MyPage
      </Button>
      <Button
        className="absolute inset-x-0 bottom-0"
        fullWidth
        variant="outlined"
        href="/"
      >
        Home
      </Button>
    </Box>
  );
}
