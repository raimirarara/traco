import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUserState } from "../redux/slices/userSlice";
import { useRouter } from "next/router";
import { auth, db, FirebaseTimestamp } from "../firebase/firebase";
import useGetTwitterRedirectResult from "../twitter/auth_twitter_signin_redirect_result";

const useAuth = ({ children }: any) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser).user;
  const router = useRouter();

  useEffect(() => {
    if (router.pathname != "/signup" && router.pathname != "/signin") {
      if (
        !user.isSignedIn /*reduxのStateがfalseならば (今のところ、Reduxは更新するとfalseになるので、更新すると下記を通る)*/
      ) {
        // updateStateUser(user);
        /* firebaseでログインしているかどうか調べてして,いなければsigninに返す関数 */
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            const uid = user.uid;
            await db
              .collection("users")
              .doc(uid)
              .get()
              .then((snapshot) => {
                const data: any = snapshot.data();
                dispatch(
                  updateUserState({
                    uid: uid,
                    username: data.username,
                    isSignedIn: true,
                    email: data.email,
                    countries: data.countries,
                    image: {
                      id: data.image.id,
                      path: data.image.path,
                    },
                    chatRooms: data.chatRooms,
                  })
                );
              });
          } else {
            router.push("/signin");
          }
        });
        () => unsubscribe();
      }
      // reduxのstateがリロードされてfalseになったのをもとに戻す。
    } else {
      useGetTwitterRedirectResult({ dispatch: dispatch });
    }
  }, [user]);
  return children;
};
export default useAuth;
