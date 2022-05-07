import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/router";
import { Button, IconButton, TextField } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { Box, height, width } from "@mui/system";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import NextImage from "next/image";
import useAddTimeLine from "../hooks/useAddTimeline";
import { getUser } from "../redux/slices/userSlice";
import { storage } from "../firebase/firebase";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import useAddTimeline from "../hooks/useAddTimeline";
import SimpleBottomNavigation from "../components/organizms/BottomNavigation";
import useGetWindowSize from "../hooks/useGetWindowSize";

export default function Post() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(getUser).user;
  const [happenings, setHappenings] = React.useState("");
  const [filelist, setFileList] = React.useState<FileList>();
  const [previews, setPreviews] = React.useState<
    { url: string; width: number; height: number }[]
  >([]);
  const { width, height } = useGetWindowSize();

  // promise化したfunction
  const loadImage = async (src: string) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
      img.src = src;
    });
  };

  const uploadImage = async () => {
    if (filelist) {
      let images: {
        id: string;
        path: string;
        width: number;
        height: number;
      }[] = [];
      Array.from(filelist).forEach(async (item, index) => {
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
            width: previews[index].width,
            height: previews[index].height,
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
    setHappenings("");
    setPreviews([]);
  };

  const previewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file) {
      setFileList(file);
      let preImg: { url: string; width: number; height: number }[] = [];
      Array.from(file).forEach((item) => {
        loadImage(window.URL.createObjectURL(item)).then((res) => {
          preImg.push({
            url: window.URL.createObjectURL(item),
            width: res.width,
            height: res.height,
          });
        });
      });
      setTimeout(() => setPreviews(preImg), 300);
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
                <Box
                  maxWidth={width / 2}
                  mb={3}
                  sx={{
                    mx: "auto",
                  }}
                >
                  <NextImage
                    width={preview.width}
                    height={preview.height}
                    src={preview.url}
                  />
                </Box>
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
                  ml: "auto",
                }}
                onClick={() => handleSubmit()}
              >
                post
              </Button>
            </Box>
          </ListItemText>
        </ListItem>
      </List>
      <div className="w-full fixed bottom-0">
        <SimpleBottomNavigation />
      </div>
    </Box>
  );
}
