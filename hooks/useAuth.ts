import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUserState } from "../redux/slices/userSlice";
import { useRouter } from "next/router";
import { auth, db } from "../firebase/firebase";
import useGetTwitterRedirectResult from "../twitter/auth_twitter_signin_redirect_result";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, DocumentData, getDoc } from "firebase/firestore";
import { Unsubscribe } from "@mui/icons-material";

const useAuth = ({ children }: any) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser).user;
  const router = useRouter();

  useEffect(() => {
    if (router.pathname != "/signup" && router.pathname != "/signin") {
      if (!user.isSignedIn) {
        /* firebaseでログインしているかどうか調べてして,いなければsigninに返す関数 */
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            if (user.emailVerified) {
              //createEmailandPasswordで、signinされるためこれが必要
              const uid = user.uid;

              const docRef = doc(db, "users", uid);

              const docSnap = await getDoc(docRef);

              const data = docSnap.data();

              // Reduxのstateを更新する
              dispatch(
                updateUserState({
                  uid: uid,
                  username: data?.username,
                  isSignedIn: true,
                  email: data?.email,
                  countries: data?.countries,
                  image: data?.image,
                  chatRooms: data?.chatRooms,
                })
              );
            } else {
              window.alert("メールアドレスの確認が済んでいません");
              router.push("/signin");
            }
          } else {
            router.push("/signin");
          }
        });

        return () => unsubscribe();
      }
    } else {
      useGetTwitterRedirectResult({ dispatch: dispatch });
    }
  }, [user]);
  return children;
};
export default useAuth;
