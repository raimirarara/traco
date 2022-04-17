import { getAuth, signInWithRedirect } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { provider } from "./twitter_provider_create";

export default function twitterLogin() {
  signInWithRedirect(auth, provider);
}
