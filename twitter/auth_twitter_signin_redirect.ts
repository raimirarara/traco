import { getAuth, signInWithRedirect } from "firebase/auth";
import Router from "next/router";
import app from "../firebase/firebase";
import { provider } from "./twitter_provider_create";

export const auth = getAuth(app);

export default function twitterLogin() {
  signInWithRedirect(auth, provider);
  Router.push("/");
}
