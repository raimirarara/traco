import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import Router from "next/router";
import { auth, db, FirebaseTimestamp } from "../../firebase/firebase";

export type userState = {
  user: {
    uid: string;
    username: string;
    email: string;
    isSignedIn: boolean;
    country: string;
    image: {
      id: string;
      path: string;
    };
  };
};

export const initialState: userState = {
  user: {
    uid: "",
    username: "",
    email: "",
    isSignedIn: false,
    country: "",
    image: {
      id: "",
      path: "",
    },
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

export type EditCountry = {
  uid: string;
  country: string;
};

export const editCounrty = createAsyncThunk(
  "user/editCounrty",
  async (editcountry: EditCountry) => {
    const { uid, country } = editcountry;
    console.log(country);
    await db.collection("users").doc(uid).update({ country: country });
    const data: any = await (
      await db.collection("users").doc(uid).get()
    ).data();

    return {
      uid: uid,
      username: data.username,
      email: data.email,
      isSignedIn: true,
      country: data.country,
      image: {
        id: data.image.id,
        path: data.image.path,
      },
    };
  }
);

export const signOutUser = createAsyncThunk("user/signOutUser", async () => {
  auth.signOut();

  return {
    ...initialState.user,
  };
});

export const addUser = createAsyncThunk(
  "user/addUser",
  async (adduser: adduser) => {
    const { username, email, password } = adduser;

    const result = await auth.createUserWithEmailAndPassword(email, password);
    const user = result.user;

    if (user) {
      const uid = user.uid;
      const timestamp = FirebaseTimestamp.now();
      const userInitialData = {
        created_at: timestamp,
        email: email,
        uid: uid,
        updated_at: timestamp,
        username: username,
        country: "",
        image: {
          id: "",
          path: "",
        },
      };

      await db.collection("users").doc(uid).set(userInitialData);
      await db
        .collection("users")
        .doc(uid)
        .collection("userPublic")
        .doc(uid)
        .set({ username: username });
      console.log("登録成功");

      return userInitialData;
    }
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (fetchuser: fetchuser) => {
    const { email, password } = fetchuser;

    const response: any = await auth.signInWithEmailAndPassword(
      email,
      password
    );

    const uid = response.user.uid;
    const data: any = await (
      await db.collection("users").doc(uid).get()
    ).data();

    return {
      uid: uid,
      username: data.username,
      email: data.email,
      isSignedIn: true,
      country: data.country,
      image: {
        id: data.image.id,
        path: data.image.path,
      },
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
    builder.addCase(addUser.rejected, (state, action: any) => {
      console.log(action.error);
    });
    builder.addCase(fetchUser.fulfilled, (state, action: any) => {
      state.user = action.payload; // payloadCreatorでreturnされた値
      alert("ログインしました。");
      Router.push("/");
    });
    builder.addCase(signOutUser.fulfilled, (state, action: any) => {
      state.user = action.payload;
      alert("サインアウトしました。");
      Router.push("/");
    });
    builder.addCase(editCounrty.fulfilled, (state, action: any) => {
      state.user = action.payload;
    });
  },
});

export const { updateUserState } = userSlice.actions;

export const getUser = (state: RootState) => state.user;

export default userSlice.reducer;
