import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleBottomNavigation from "../../components/organizms/BottomNavigation";
import MultiSelectCountries from "../../components/organizms/MultiSelectCountries";
import {
  editCountries,
  editName,
  editProfileImage,
  getUser,
} from "../../redux/slices/userSlice";
import DoneIcon from "@mui/icons-material/Done";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../firebase/firebase";
import AutorenewIcon from "@mui/icons-material/Autorenew";

export default function ProfileEdit() {
  const dispatch = useDispatch();
  const user = useSelector(getUser).user;
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [selectCountries, setSelectCountries] = useState<string[]>([]);

  const changeName = (username: string) => {
    dispatch(editName({ uid: user.uid, username: username }));
    window.alert("名前を変更しました!");
  };
  const changeCountries = (countries: string[]) => {
    dispatch(editCountries({ uid: user.uid, countries: countries }));
    window.alert("国を変更しました!");
  };

  // Cloud Storageに画像をアップ
  const uploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const deleteRef = ref(storage, "images/" + user.image.id);

    // Delete the file
    setTimeout(
      () =>
        deleteObject(deleteRef)
          .then(() => {
            console.log("delete image");
          })
          .catch((e) => {
            console.log(e);
          }),
      10000
    );
    // genetrate random 16 digits strings
    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const N = 16;
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))) //file名をランダムにする
      .map((n) => S[n % S.length])
      .join("");

    const storageRef = ref(storage, "images/" + fileName);

    const file = event.target.files;
    if (file) {
      const blob = new Blob([file[0]], {
        type: "image/jpeg",
      }); // CloudStorageにアップするためにBlobを使う

      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, blob).then(async (snapshot) => {
        const url = await getDownloadURL(storageRef);
        console.log(url);
        dispatch(
          editProfileImage({
            uid: user.uid,
            image: { id: fileName, path: url },
          })
        );
        alert("プロフィール画像を変更しました!");
      });
    }
  };

  useEffect(() => {
    setName(user.username);
    setSelectCountries(user.countries);
  }, [user]);

  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ overflow: "scroll" }}>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography color={"primary"} align="center" variant="h5" pt={2}>
            Profile Edit
          </Typography>
          <Box
            sx={{
              width: 300,
              margin: 2,
              boxShadow: 2,
              paddingTop: 1,
              paddingBottom: 2,
            }}
          >
            <Typography color={"primary"} align="center" variant="h6">
              プロフィール画像
            </Typography>
            <Box sx={{ position: "relative" }}>
              <label>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    marginX: "auto",
                  }}
                  src={user.image.path}
                />

                <AutorenewIcon
                  sx={{
                    position: "absolute",
                    zIndex: 1,
                    top: 60,
                    right: 110,
                  }}
                />
                <input
                  className="hidden"
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={(e) => uploadImage(e)}
                />
              </label>
            </Box>
          </Box>
          <Box sx={{ width: 300, margin: 2, boxShadow: 2, paddingY: 1 }}>
            <Typography color={"primary"} align="center" variant="h6">
              名前
            </Typography>
            <TextField
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
              <Button onClick={() => changeName(name)}>保存する</Button>
            </Box>
          </Box>
          <Box sx={{ width: 300, margin: 2, boxShadow: 2, paddingY: 1 }}>
            <Typography color={"primary"} align="center" variant="h6">
              メールアドレス
            </Typography>
            <Typography align="center" variant="subtitle1">
              {user.email}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }} mt={2}>
            <MultiSelectCountries
              selectCountries={selectCountries}
              setSelectCountries={setSelectCountries}
            />
            <IconButton onClick={() => changeCountries(selectCountries)}>
              <DoneIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
      <div className="w-full fixed bottom-0">
        <SimpleBottomNavigation />
      </div>
    </>
  );
}
