import { getAuth, signInWithRedirect } from "firebase/auth";
import app from "../firebase/firebase";
import { provider } from "./twitter_provider_create";

export const auth = getAuth(app);

export default function twitterLogin() {
  signInWithRedirect(auth, provider);
}
