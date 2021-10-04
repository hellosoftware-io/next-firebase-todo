import React from "react";
import firebase from "network/firebase";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Link,
  Typography,
  TextField,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string().min(6, "Too short").required("Required"),
});

export default function SignInWithEmail(): JSX.Element {
  firebase.auth().useDeviceLanguage();

  function signup(email: string, password: string) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((_userCredential) => {
        console.log("User signed up :)");
        // You can access the user credential here
      })
      .catch((error) => {
        console.error(error);
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
  }

  function signin(email: string, password: string) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((_userCredential) => {
        console.log("User signed in :)");
        // You can access the user credential here
      })
      .catch((error) => {
        console.error(error);
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ height: "100%", p: 2, my: 8 }}>
        <Box>
          <Typography variant="h2" sx={{ my: 2 }}>
            Sign in with email
          </Typography>
          <Box>
            <Formik
              initialValues={{
                email: "",
                password: "",
                signup: false,
              }}
              validationSchema={ValidationSchema}
              onSubmit={(values, { setSubmitting }) => {
                if (values.signup === true) {
                  signup(values.email, values.password).catch(() => {
                    setSubmitting(false);
                  });
                } else {
                  signin(values.email, values.password).catch(() => {
                    setSubmitting(false);
                  });
                }
              }}
            >
              {({
                submitForm,
                isSubmitting,
                values,
                handleChange,
                setFieldValue,
                touched,
                errors,
              }) => (
                <Form>
                  <Grid container spacing={3} sx={{ mb: 2 }}>
                    <Grid item xs={12}>
                      <TextField
                        name="email"
                        label="Email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        fullWidth
                        variant="filled"
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="password"
                        label="Password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        fullWidth
                        variant="filled"
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={submitForm}
                    disabled={isSubmitting}
                    sx={{ mr: 2 }}
                  >
                    Sign in
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => {
                      setFieldValue("signup", true);
                      submitForm();
                    }}
                    disabled={isSubmitting}
                  >
                    Sign up
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
          <Box sx={{ mt: 2 }}>
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
