import React, { useState } from "react";
import firebase from "network/firebase";
import { Box, Button, Card, Container, Link, Typography } from "@mui/material";
import SignInWithEmail from "./SignInWithEmail";

export default function SignIn(): JSX.Element {
  const [showSigninEmail, setShowSigninEmail] = useState(false);
  const provider = new firebase.auth.GoogleAuthProvider();

  function signinClicked() {
    firebase.auth().useDeviceLanguage();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        console.log("Signed in with popup");
      });
  }

  function signinEmailClicked() {
    setShowSigninEmail(true);
  }

  if (showSigninEmail === true) {
    return <SignInWithEmail />;
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ height: "100%", p: 2, my: 8 }}>
        <Box>
          <Box
            component="img"
            sx={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
            src={"/signin.svg"}
          />
          <Typography variant="h2" sx={{ my: 2 }}>
            Sign in
          </Typography>
          <Typography variant="body2">
            Start keeping track of your to-do list.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              sx={{ mr: 2 }}
              color="primary"
              variant="contained"
              disableElevation
              onClick={signinClicked}
            >
              With Google
            </Button>
            <Button
              color="primary"
              variant="contained"
              disableElevation
              onClick={signinEmailClicked}
            >
              With email
            </Button>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              By clicking sign in you agree to our{" "}
              <Link href="/policies/privacy-policy">Privacy Policy</Link> and{" "}
              <Link href="/policies/eula">EULA</Link>
            </Typography>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
