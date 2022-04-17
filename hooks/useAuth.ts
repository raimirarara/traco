import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUserState } from "../redux/slices/userSlice";
import { useRouter } from "next/router";
import { auth, db } from "../firebase/firebase";
import useGetTwitterRedirectResult from "../twitter/auth_twitter_signin_redirect_result";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, DocumentData, getDoc } from "firebase/firestore";

const useAuth = ({ children }: any) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser).user;
  const router = useRouter();

  useEffect(() => {
    if (router.pathname != "/signup" && router.pathname != "/signin") {
      /* firebaseでログインしているかどうか調べてして,いなければsigninに返す関数 */
      onAuthStateChanged(auth, async (user) => {
        if (user) {
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
          router.push("/signin");
        }
      });
    } else {
      useGetTwitterRedirectResult({ dispatch: dispatch });
    }
  }, [user]);
  return children;
};
export default useAuth;
