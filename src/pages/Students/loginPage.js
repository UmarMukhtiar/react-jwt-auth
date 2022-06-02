import { Paper, Grid, Avatar, Typography } from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import { Formik, Form } from "formik";
import { Button, Stack, TextField, Divider } from "@mui/material";
import AuthService from "../../services/auth.services";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const paperStyle = {
    padding: "30px 20px 20px 20px",
    transform: 'translate(50%, 50%)',
    width: 300,
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

  // const loginUser = async () => {
  //   console.log(formValues);
  //   const response = await api.post(`/login`, formValues);
  //   console.log();
  //   if(response.data.user){
  //     localStorage.setItem('token', response.data.user)
  //     alert('Login Successfull!');
  //     window.location.href = '/';
  //   }else{
  //     alert('Login Failed!');
  //   }
  // };

  const loginUser = async () => {
    const response = await AuthService.login(formValues);
    if (response.status) {
      navigate("/api/students", { replace: true });
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
