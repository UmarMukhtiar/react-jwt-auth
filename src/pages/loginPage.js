import { Paper, Grid, Avatar, Typography } from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Formik, Form } from "formik";
import { Button, Stack, TextField, Divider } from "@mui/material";
import AuthService from "../services/auth.services";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const paperStyle = {
    padding: "30px 20px 20px 20px",
    top: "50%",
    left: "50%",
    margin: "-200px 0 0 -150px",
    width: 300,
    position: "absolute",
  };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const buttonStyle = { width: "100%", height: "40px" };
  const marginTop = { marginTop: 5 };

  const initialValues = {
    email: "",
    password: "",
  };

  const loginUser = async (values) => {
    const response = await AuthService.login(values);
    if (response.status) {
      navigate("/api/home/students", { replace: true });
    } else {
      console.log("Error Occured!");
    }
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineIcon />
          </Avatar>
          <h2 style={headerStyle}>Login</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to login!
          </Typography>
        </Grid>
        <Formik initialValues={initialValues} onSubmit={(values)=>loginUser(values)}>
          {({ values, handleSubmit, handleChange }) => (
            <Form onSubmit={handleSubmit} style={marginTop}>
              <Stack spacing={2}>
                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  placeholder="Enter your Email"
                  required
                  value={values.email}
                  onChange={handleChange}
                />
                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your Password"
                  variant="outlined"
                  required
                  value={values.password}
                  onChange={handleChange}
                />
                <Divider />
                <Button
                  type="submit"
                  size="medium"
                  variant="contained"
                  color="primary"
                  style={buttonStyle}
                >
                  Login
                </Button>
                <Divider />
                <Typography variant="caption">
                  Don't have account? <a href="/api/signup">create one!</a>
                </Typography>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default LoginPage;
