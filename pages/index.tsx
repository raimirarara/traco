import { Box, Button, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import SimpleBottomNavigation from "../components/organizms/BottomNavigation";
import styles from "../styles/Home.module.css";
import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import AsiaSouthEast from "../public/image/asiasoutheast.png";
import CountryButton from "../components/organizms/CountryButton";
import { db } from "../firebase/firebase";
import useCountryUsers from "../hooks/useCountryUsers";
import { useDispatch, useSelector } from "react-redux";
import { addChatRoomId, getUser } from "../redux/slices/userSlice";
import useGetUidFromName from "../hooks/useGetUidFromName";
import { useRouter } from "next/router";
import useMakeChatRoom from "../hooks/useMakeChatRoom";
import useGetWindowSize from "../hooks/useGetWindowSize";

const Home: NextPage = () => {
  //APIKEYは""としていれば開発者モードで使えます
  const APIKEY = "";
  const [center, setCenter] = useState({ lat: 50, lng: 50 });
  const [zoom, setZoom] = useState(3);
  const router = useRouter();
  const dispatch = useDispatch();
  const { height, width } = useGetWindowSize();

  const [selectCountry, setSelectCountry] = useState("");

  const [countryUsers, setCountryUsers] = useState<string[]>([]);
  const user = useSelector(getUser).user;

  async function startChat(chatPartnerName: string): Promise<void> {
    const chatPartnerUid: string = await useGetUidFromName(chatPartnerName);
    let validFlag = false;
    user.chatRooms.forEach(async (chatRoom) => {
      if (chatRoom.chatPartnerUid == chatPartnerUid) {
        validFlag = true;
        console.log("すでにchatroomが存在していました。");
        router.push("/chat/" + chatRoom.chatRoomId);
      }
    });
    if (!validFlag) {
      const chatRoomId: string = await useMakeChatRoom();
      console.log(chatPartnerUid);
      await dispatch(
        addChatRoomId({
          uid: user.uid,
          chatPartnerUid: chatPartnerUid,
          chatRoomId: chatRoomId,
        })
      );
      router.push("/chat/" + chatRoomId);
    }
  }

  useEffect(() => {
    console.log("selectCountry : ", selectCountry);
    useCountryUsers(selectCountry).then((users) => {
      setCountryUsers(users);
      console.log(users);
    });
    console.log("countryUsers:", countryUsers);
  }, [selectCountry]);

  return (
    <div>
      <Box>
        <Head>
          <title>Traco</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box
          className="relative inline-block align-middle"
          width={414}
          height={483}
        >
          <CountryButton
            selectCountry={selectCountry}
            setSelectCountry={setSelectCountry}
          />
          <Image width={414} height={483} src={AsiaSouthEast} />
        </Box>
        <Box>
          {countryUsers.map((username: string) => (
            <Button
              key={username}
              onClick={() => startChat(username)}
              fullWidth
            >
              {username}
            </Button>
          ))}
        </Box>
      </Box>

      <div className="w-full fixed bottom-0">
        <SimpleBottomNavigation />
      </div>
    </div>
  );
};

export default Home;
