import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MessageField from "../../components/atoms/MessageField";
import ChatArea from "../../components/organizms/ChatArea";
import { db } from "../../firebase/firebase";
import useGetUserData from "../../hooks/useGetUserData";
import useSendText from "../../hooks/useSendText";
import { getUser } from "../../redux/slices/userSlice";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SimpleBottomNavigation from "../../components/organizms/BottomNavigation";

export type PertnerUser = {
  uid: string;
  username: string;
  countries: string[];
  image: {
    id: string;
    path: string;
  };
};

export default function Uid() {
  const user = useSelector(getUser).user;
  const [partnerUser, setPartnerUser] = useState<PertnerUser>();
  const router = useRouter();

  useEffect(() => {
    useGetUserData(router.query.uid as string).then((user) => {
      setPartnerUser(user);
    });
  }, [user]);

  return (
    <div>
      <Box>
        <div className="flex">
          <Box width={"20%"} />
          <Box width={"60%"}>
            <Box height={16} />
            <Typography color={"primary"} align="center" variant="h5">
              {partnerUser?.username}
            </Typography>
          </Box>
        </div>
        <Box sx={{ display: "flex", justifyContent: "center" }} my={2}>
          <Avatar
            sx={{ width: 80, height: 80 }}
            src={partnerUser?.image.path}
          />
        </Box>
        <Typography color={"primary"} align="center" variant="h5" mt={8}>
          訪問した国
        </Typography>
        <Typography align="center" variant="subtitle1">
          {partnerUser?.countries &&
            partnerUser.countries.map((country) => (
              <p key={country}>{country}</p>
            ))}
        </Typography>
      </Box>
      <div className="w-full fixed bottom-0">
        <SimpleBottomNavigation />
      </div>
    </div>
  );
}
