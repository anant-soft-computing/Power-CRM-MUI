import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../img/logo.png";
import ajaxCall from "../../helpers/ajaxCall";
import { setToLocalStorage } from "../../helpers/helper";
import { authAction } from "../../store/authStore";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = { userName: "", password: "" };

  const validationSchema = Yup.object({
    userName: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    setIsLoading(true);
    const { userName, password } = values;
    const data = {
      username: userName,
      password: password,
    };
    try {
      const response = await ajaxCall(
        "login/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
          withCredentials: true,
        },
        8000
      );
      if (response.status === 200) {
        toast.success("Welcome To PowerCRM");
        handleLoginSuccess(response);
        navigate(`/Dashboard`);
      } else if (response.status === 400) {
        toast.error("Please Check Username and Password");
      } else if (response.status === 404) {
        toast.error("Username or Password is wrong, Please try again...");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    }
    setIsLoading(false);
    setSubmitting(false);
  };

  const handleLoginSuccess = (response) => {
    const localObj = {
      loggedIn: true,
      accessToken: response.data.token.access,
      refreshToken: response.data.token.refresh,
      timeOfLogin: Date.now(),
    };
    setToLocalStorage("loginInfo", localObj, true);
    dispatch(
      authAction.setAuthStatus({
        loggedIn: true,
        accessToken: response.data?.token?.access,
        refreshToken: response.data?.token?.refresh,
        timeOfLogin: Date.now(),
        logInOperation: 1,
      })
    );
    setTimeout(
      () =>
        dispatch(
          authAction.setAuthStatus({
            loggedIn: false,
            accessToken: null,
            refreshToken: null,
            timeOfLogin: null,
            logInOperation: -1,
          })
        ),
      1000 * 60 * 30
    );
    navigate("/Dashboard");
  };

  return (
    <Container maxWidth="sm" sx={{ my: 25 }}>
      <Grid maxWidth="sm">
        <Grid item xs={6}>
          <Typography
            variant="h4"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <img src={logo} alt="Power CRM" />
            <span>Power CRM</span>
          </Typography>
          <Card sx={{ boxShadow: 5, mt: 3 }}>
            <CardContent>
              <Box textAlign="center" py={2}>
                <Typography variant="h5">Login to Your Account</Typography>
                <Typography variant="body2" color="textSecondary">
                  Enter your username & password to login
                </Typography>
              </Box>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
              >
                {({ errors, touched, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <Box mb={3}>
                      <Field
                        as={TextField}
                        name="userName"
                        label="Username"
                        variant="outlined"
                        fullWidth
                        error={touched.userName && Boolean(errors.userName)}
                        helperText={<ErrorMessage name="userName" />}
                      />
                    </Box>
                    <Box mb={3}>
                      <Field
                        as={TextField}
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        error={touched.password && Boolean(errors.password)}
                        helperText={<ErrorMessage name="password" />}
                      />
                    </Box>
                    <Box>
                      {isLoading ? (
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          disabled
                        >
                          <CircularProgress />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                        >
                          Login
                        </Button>
                      )}
                    </Box>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
