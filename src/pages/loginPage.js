import { Paper, Grid, Avatar, Typography } from "@mui/material";
import React, { useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
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
    margin: '-200px 0 0 -150px',
    width: 300,
    position: "absolute"
  };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const buttonStyle = { width: "100%", height: "40px" };
  const marginTop = { marginTop: 5 };

  const initialValues = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const loginUser = async () => {
    const response = await AuthService.login(formValues);
    if (response.status) {
      navigate("/api/home/students", { replace: true });
    } else {
      console.log("Error Occured!");
    }
  };

  const authUser = async () => {
    const response = await AuthService.auth();
    if(response) navigate("/api/home/students", { replace: true });
  }

  useEffect(() => {
    authUser();
  }, [])

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
        <Formik initialValues={formValues} onSubmit={loginUser}>
          {() => (
            <Form style={marginTop}>
              <Stack spacing={2}>
                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  placeholder="Enter your Email"
                  required
                  value={formValues.email}
                  onChange={handleChange}
                />
                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your Password"
                  variant="outlined"
                  required
                  value={formValues.password}
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
