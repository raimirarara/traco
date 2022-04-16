import { getAuth, signInWithRedirect } from "firebase/auth";
import { provider } from "./twitter_provider_create";

export const auth = getAuth();

export default function twitterLogin() {
  signInWithRedirect(auth, provider);
}
