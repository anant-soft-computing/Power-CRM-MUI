import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Grid, Box, Card, CardContent, Typography, Button, TextField, CircularProgress } from '@mui/material';
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
    });

    const handleLogin = async (values) => {
        setLoading(true);
        const { username, password } = values;

        const bodyData = {
            username: username,
            password: password,
        };

        try {
            const response = await fetch(
                "https://aumhealthresort.com/powercrm/api/login/",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bodyData),
                }
            );
            const data = await response.json();
            console.log(data);
            if (data) {
                localStorage.setItem("token", data.token.access);
                navigate("/Dashboard");
            } else if (response.status === 401) {
                toast.error("Invalid username or password");
            }
            else {
                toast.error("Some Problem Occurred. Please try again.");
            }
        } catch (error) {
            console.error("Error logging in:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Grid maxWidth="sm" >
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center" py={4}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography variant="h4">Power CRM</Typography>
                        </Link>
                    </Box>
                    <Card sx={{ border: '1px solid #ccc', boxShadow: 3, borderRadius: 2, mt: 4, p: 2 }}>
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
                                {({ errors, touched }) => (
                                    <Form>
                                        <Box mb={3}>
                                            <Field
                                                as={TextField}
                                                name="username"
                                                label="Username"
                                                variant="outlined"
                                                fullWidth
                                                error={touched.username && Boolean(errors.username)}
                                                helperText={<ErrorMessage name="username" />}
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
                                            {loading ? (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    fullWidth
                                                    disabled
                                                >
                                                    <CircularProgress size={24} />
                                                    &nbsp; Loading...
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
