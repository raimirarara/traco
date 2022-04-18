import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import Router from "next/router";
import { auth, db } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  getRedirectResult,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  TwitterAuthProvider,
  User,
} from "firebase/auth";
import { useReducer } from "react";
import {
  arrayUnion,
  collection,
  doc,
  FieldValue,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

export type userState = {
  user: {
    uid: string;
    username: string;
    email: string;
    isSignedIn: boolean;
    countries: string[];
    image: {
      id: string;
      path: string;
    };
    chatRooms: { chatRoomId: string; chatPartnerUid: string }[];
  };
};

export const initialState: userState = {
  user: {
    uid: "",
    username: "",
    email: "",
    isSignedIn: false,
    countries: [],
    image: {
      id: "",
      path: "",
    },
    chatRooms: [],
  },
};

export type fetchuser = {
  email: string;
  password: string;
};

export type adduser = {
  username: string;
  email: string;
  password: string;
};

export type EditCountries = {
  uid: string;
  countries: string[];
};

export type AddChatRoomId = {
  uid: string;
  chatPartnerUid: string;
  chatRoomId: string;
};

export const addChatRoomId = createAsyncThunk(
  "user/addChatRoomId",
  async (addchatroomId: AddChatRoomId, thunkAPI) => {
    const { uid, chatPartnerUid, chatRoomId } = addchatroomId;

    const docRef = doc(db, "users", uid);

    await updateDoc(docRef, {
      chatRooms: arrayUnion({
        chatRoomId: chatRoomId,
        chatPartnerUid: chatPartnerUid,
      }),
    });

    const docPartnerRef = doc(db, "users", chatPartnerUid);

    await updateDoc(docPartnerRef, {
      chatRooms: arrayUnion({
        chatRoomId: chatRoomId,
        chatPartnerUid: uid,
      }),
    });

    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    return {
      uid: uid,
      username: data?.username,
      email: data?.email,
      isSignedIn: true,
      countries: data?.countries,
      image: {
        id: data?.image.id,
        path: data?.image.path,
      },
      chatRooms: data?.chatRooms,
    };
  }
);

export const editProfileImage = createAsyncThunk(
  "user/editProfileImage",
  async (editimage: { uid: string; image: { id: string; path: string } }) => {
    const { uid, image } = editimage;

    const docRef = doc(db, "users", uid);

    await updateDoc(docRef, { image: image });

    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    return {
      uid: uid,
      username: data?.username,
      email: data?.email,
      isSignedIn: true,
      countries: data?.countries,
      image: data?.image,
      chatRooms: data?.chatRooms,
    };
  }
);

export const editName = createAsyncThunk(
  "user/editName",
  async (editname: { uid: string; username: string }, thunkAPI) => {
    const { uid, username } = editname;

    const docRef = doc(db, "users", uid);

    await updateDoc(docRef, { username: username });

    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    return {
      uid: uid,
      username: data?.username,
      email: data?.email,
      isSignedIn: true,
      countries: data?.countries,
      image: data?.image,
      chatRooms: data?.chatRooms,
    };
  }
);

export const editCountries = createAsyncThunk(
  "user/editCountries",
  async (editcountries: EditCountries, thunkAPI) => {
    const { uid, countries } = editcountries;
    console.log(countries);

    const docRef = doc(db, "users", uid);

    await updateDoc(docRef, { countries: countries });

    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    return {
      uid: uid,
      username: data?.username,
      email: data?.email,
      isSignedIn: true,
      countries: data?.countries,
      image: data?.image,
      chatRooms: data?.chatRooms,
    };
  }
);

export const signOutUser = createAsyncThunk(
  "user/signOutUser",
  async ({}, thunkAPI) => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
    return {
      ...initialState.user,
    };
  }
);

export const addTwitterUser = createAsyncThunk(
  "user/addTwitterUser",
  async (user: User & { twitterId: string }, thunkAPI) => {
    const docData = {
      created_at: Timestamp.now(),
      email: user.email,
      uuId: user.twitterId,
      uid: user.uid,
      username: user.displayName,
      countries: [],
      image: {
        id: "",
        path: user.photoURL,
      },
      chatRooms: [],
    };

    await setDoc(doc(db, "users", user.uid), docData);

    // Reduxのstateを更新する
    return {
      uid: user.uid,
      username: user.displayName,
      isSignedIn: true,
      email: user.email,
      countries: [],
      image: {
        id: "",
        path: "",
      },
      chatRooms: [],
    };
  }
);

export const fetchTwitterUser = createAsyncThunk(
  "user/fetchTwitterUser",
  async (user: User, thunkAPI) => {
    const uid = user.uid;
    const docRef = doc(db, "users", uid);

    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    return {
      uid: uid,
      username: data?.username,
      email: data?.email,
      isSignedIn: true,
      countries: data?.countries,
      image: {
        id: data?.image.id,
        path: data?.image.path,
      },
      chatRooms: data?.chatRooms,
    };
  }
);

export const addUser = createAsyncThunk(
  "user/addUser",
  async (adduser: adduser, thunkAPI) => {
    const { username, email, password } = adduser;

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Signed in
    const user = userCredential.user;

    const docData = {
      created_at: Timestamp.now(),
      email: email,
      uid: user.uid,
      username: username,
      countries: [],
      image: {
        id: "",
        path: "",
      },
      chatRooms: [],
    };

    await setDoc(doc(db, "users", user.uid), docData);

    // Reduxのstateを更新する
    return {
      uid: user.uid,
      username: username,
      isSignedIn: true,
      email: email,
      countries: [],
      image: {
        id: "",
        path: "",
      },
      chatRooms: [],
    };
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (fetchuser: fetchuser, thunkAPI) => {
    const { email, password } = fetchuser;

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Signed in
    const user = userCredential.user;
    const uid = user.uid;
    const docRef = doc(db, "users", uid);

    const docSnap = await getDoc(docRef);

    const data = docSnap.data();

    // Reduxのstateを更新する
    return {
      uid: uid,
      username: data?.username,
      isSignedIn: true,
      email: data?.email,
      countries: data?.countries,
      image: data?.image,
      chatRooms: data?.chatRooms,
    };
  }
);

// State, Reducer, Action を一気に生成する
const userSlice = createSlice({
  name: "user", //スライスの名前を設定
  initialState, //stateの初期値を設定
  reducers: {
    updateUserState: (state: userState, action: any) => ({
      user: {
        ...action.payload,
      } /* もとの配列を展開して新しい配列を作る */,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(addUser.fulfilled, (state, action: any) => {
      state.user = action.payload; // payloadCreatorでreturnされた値
      alert("登録完了しました。");
      Router.push("/");
    });
    builder.addCase(fetchUser.fulfilled, (state, action: any) => {
      state.user = action.payload; // payloadCreatorでreturnされた値
      alert("ログインしました。");
      Router.push("/");
    });
    builder.addCase(signOutUser.fulfilled, (state, action: any) => {
      state.user = action.payload;
      alert("ログアウトしました。");
      Router.push("/signin");
    });
    builder.addCase(editProfileImage.fulfilled, (state, action: any) => {
      state.user = action.payload;
      console.log(state.user);
    });
    builder.addCase(editName.fulfilled, (state, action: any) => {
      state.user = action.payload;
      console.log(state.user);
    });
    builder.addCase(editCountries.fulfilled, (state, action: any) => {
      state.user = action.payload;
      console.log(state.user);
    });
    builder.addCase(addChatRoomId.fulfilled, (state, action: any) => {
      state.user = action.payload;
      console.log(state.user);
    });
    builder.addCase(addTwitterUser.fulfilled, (state, action: any) => {
      state.user = action.payload;
      alert("登録しました。");
      Router.push("/");
    });
    builder.addCase(fetchTwitterUser.fulfilled, (state, action: any) => {
      state.user = action.payload;
      alert("ログインしました。");
      Router.push("/");
    });
  },
});

export const { updateUserState } = userSlice.actions;

export const getUser = (state: RootState) => state.user;

export default userSlice.reducer;
