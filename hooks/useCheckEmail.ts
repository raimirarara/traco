import { sendEmailVerification, User } from "firebase/auth";

export default async function useCheckEmail(user: User) {
  const actionCodeSettings = {
    url: "https://traco.vercel.app/signin",
  };
  sendEmailVerification(user, actionCodeSettings);
}
