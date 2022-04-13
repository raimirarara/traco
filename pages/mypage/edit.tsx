import {
  Box,
  Button,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleBottomNavigation from "../../components/organizms/BottomNavigation";
import MultiSelectCountries from "../../components/organizms/MultiSelectCountries";
import { editCountries, getUser } from "../../redux/slices/userSlice";
import DoneIcon from "@mui/icons-material/Done";

export default function ProfileEdit() {
  const dispatch = useDispatch();
  const user = useSelector(getUser).user;
  const router = useRouter();

  const [selectCountries, setSelectCountries] = useState<string[]>([]);

  const handleChange = (countries: string[]) => {
    dispatch(editCountries({ uid: user.uid, countries: countries }));
    router.push("/mypage");
  };

  useEffect(() => {
    console.log(user);
    setSelectCountries(user.countries);
  }, [user]);

  return (
    <Box>
      <Box height={680}>
        <Typography color={"primary"} align="center" variant="h5" pt={2}>
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
        <Box className="flex justify-end" pr={8}>
          <IconButton onClick={() => handleChange(selectCountries)}>
            <DoneIcon />
            {/* <Typography fontSize={14}>update</Typography> */}
          </IconButton>
        </Box>
      </Box>
      {/* <Button
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
      </Button> */}
      <SimpleBottomNavigation />
    </Box>
  );
}
