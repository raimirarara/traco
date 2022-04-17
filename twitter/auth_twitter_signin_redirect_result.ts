import { Box } from "@mui/system";
import {
  getAdditionalUserInfo,
  getRedirectResult,
  TwitterAuthProvider,
  UserCredential,
} from "firebase/auth";
import { Dispatch } from "react";
import { db } from "../firebase/firebase";
import { addTwitterUser, fetchTwitterUser } from "../redux/slices/userSlice";
import { auth } from "./auth_twitter_signin_redirect";

type Props = {
  dispatch: Dispatch<any>;
};

export default function useGetTwitterRedirectResult(props: Props) {
  getRedirectResult(auth)
    .then(async (result) => {
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      if (result) {
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const twitterId = getAdditionalUserInfo(result)?.username as string;
        const token = credential?.accessToken;
        const secret = credential?.secret;

        // The signed-in user info.
        const user = result.user;
        await db
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              props.dispatch(fetchTwitterUser(user));
            } else {
              props.dispatch(addTwitterUser({ ...user, twitterId }));
            }
          });
      }
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = TwitterAuthProvider.credentialFromError(error);
      // ...
      console.log(errorMessage);
    });
}
