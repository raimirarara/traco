import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultiSelectCountries from "../../components/organizms/MultiSelectCountries";
import { editCountries, getUser } from "../../redux/slices/userSlice";

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

  const [selectCountries, setSelectCountries] = useState<string[]>([]);

  const handleChange = (countries: string[]) => {
    dispatch(editCountries({ uid: user.uid, countries: countries }));
  };

  useEffect(() => {
    console.log(user);
    setSelectCountries(user.countries);
  }, [user]);

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

      <MultiSelectCountries
        selectCountries={selectCountries}
        setSelectCountries={setSelectCountries}
      />
      <Button
        className="absolute inset-x-0 bottom-20"
        fullWidth
        variant="outlined"
        onClick={() => handleChange(selectCountries)}
      >
        UPDATE
      </Button>
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
