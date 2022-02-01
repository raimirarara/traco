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

const Home: NextPage = () => {
  //APIKEYは""としていれば開発者モードで使えます
  const APIKEY = "";
  const [center, setCenter] = useState({ lat: 50, lng: 50 });
  const [zoom, setZoom] = useState(3);

  const [selectCountry, setSelectCountry] = useState("");

  const [countryUsers, setCountryUsers] = useState<string[]>([]);

  useEffect(() => {
    console.log("selectCountry : ", selectCountry);
    useCountryUsers(selectCountry).then((users) => {
      setCountryUsers(users);
      console.log(users);
    });
    console.log("countryUsers:", countryUsers);
  }, [selectCountry]);

  return (
    <div className="relative h-screen">
      <Head>
        <title>Traco</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className="relative">
        <CountryButton
          selectCountry={selectCountry}
          setSelectCountry={setSelectCountry}
        />
        <Image src={AsiaSouthEast} />
      </Box>
      <Box>
        {countryUsers.map((user: string) => (
          <Typography>{user}</Typography>
        ))}
      </Box>

      <div className="absolute inset-x-0 bottom-0">
        <SimpleBottomNavigation />
      </div>
    </div>
  );
};

export default Home;
