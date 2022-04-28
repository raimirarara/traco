import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/router";
import { Button, IconButton, TextField } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { Box } from "@mui/system";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import useAddTimeLine from "../hooks/useAddTimeline";
import { getUser } from "../redux/slices/userSlice";
import { storage } from "../firebase/firebase";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import useAddTimeline from "../hooks/useAddTimeline";

export default function Post() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(getUser).user;
  const [happenings, setHappenings] = React.useState("");
  const [filelist, setFileList] = React.useState<FileList>();
  const [previews, setPreviews] = React.useState<string[]>([]);

  const handleSubmit = async () => {
    console.log(previews);
    if (previews.length > 0) {
      await uploadImage();
    } else {
      useAddTimeline({
        uid: user.uid,
        content: happenings,
        images: [],
      });
    }
  };

  const previewImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file) {
      setFileList(file);
      let urls: string[] = [];
      Array.from(file).forEach((item) => {
        urls.push(window.URL.createObjectURL(item));
      });
      setPreviews(urls);
    }
  };

  const uploadImage = async () => {
    if (filelist) {
      let images: { id: string; path: string }[] = [];
      Array.from(filelist).forEach(async (item) => {
        const blob = new Blob([item], {
          type: "image/jpeg",
        });
        // 'file' comes from the Blob or File API
        // genetrate random 16 digits strings
        const S =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N = 16;
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))) //file名をランダムにする
          .map((n) => S[n % S.length])
          .join("");
        const storageRef = ref(storage, "images/" + fileName);
        await uploadBytes(storageRef, blob).then(async (snapshot) => {
          images.push({
            id: fileName,
            path: await getDownloadURL(storageRef),
          });
        });
        if (images.length == previews.length) {
          await useAddTimeLine({
            uid: user.uid,
            content: happenings,
            images: images,
          });
        }
      });
    }
  };

  return (
    <Box>
      <IconButton onClick={() => router.push("/timeline")}>
        <ArrowBackIosNewIcon color={"primary"} />
      </IconButton>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={user.image.path} />
          </ListItemAvatar>
          <ListItemText>
            <TextField
              margin="normal"
              fullWidth
              label="What's happening?"
              variant="standard"
              multiline
              rows={3}
              autoFocus
              value={happenings}
              onChange={(e) => setHappenings(e.target.value)}
            />
            {previews.length > 0 &&
              previews.map((preview) => (
                <Image width={100} height={100} src={preview} />
              ))}

            <Box sx={{ display: "flex" }}>
              <IconButton size="small" color="primary">
                <label>
                  <ImageIcon />
                  <input
                    className="hidden"
                    type="file"
                    id="image"
                    accept="image/*"
                    multiple
                    onChange={(e) => previewImage(e)}
                  />
                </label>
              </IconButton>

              <Button
                sx={{
                  borderRadius: "30px",
                }}
                onClick={() => handleSubmit()}
              >
                post
              </Button>
            </Box>
          </ListItemText>
        </ListItem>
      </List>
    </Box>
  );
}
