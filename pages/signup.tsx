import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { addTwitterUser, addUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import twitterLogin from "../twitter/auth_twitter_signin_redirect";
import TwitterIcon from "@mui/icons-material/Twitter";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { Router } from "@mui/icons-material";
import { useRouter } from "next/router";
import useCheckEmail from "../hooks/useCheckEmail";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const validate = (password: string, confirmPassword: string) => {
  if (password != confirmPassword) {
    return false;
  }
  return true;
};

export default function SignUp() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get("username") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const confirmPassword = data.get("confirmPassword") as string;

    const validateFlag: boolean = validate(password, confirmPassword);

    const userdata = {
      username: username,
      email: email,
      password: password,
    };
    if (validateFlag) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(addUser({ ...user, username: username }));
          useCheckEmail(user).then(() => {
            router.push("/signin");
          });
        })
        .catch((error) => {
          console.log(error.code);
          if (error.code == "auth/invalid-email") {
            alert("正しいメールアドレスを入力してください");
          } else if (error.code == "auth/weak-password") {
            alert("6文字以上のパスワードを入力してください");
          } else if (error.code == "auth/email-already-in-use") {
            alert("このメールアドレスはすでに使われています");
          }
        });
    } else {
      alert("パスワードが一致しません。");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password (6文字以上)"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="ConfirmPassword"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Box
          width={"100%"}
          height={36}
          mt={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "white",
            bgcolor: "#1DA1F2",
            ":hover": {
              opacity: 0.5,
            },
          }}
          onClick={() => twitterLogin()}
        >
          <TwitterIcon sx={{ marginY: "auto" }} fontSize="small" />
          <Box width={10} />
          <Typography sx={{ marginY: "auto" }} fontWeight={"bold"}>
            Twitterで登録
          </Typography>
        </Box> */}
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
