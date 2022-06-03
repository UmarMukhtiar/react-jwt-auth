import { Paper, Grid, Avatar, Typography } from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Formik, Form, ErrorMessage } from "formik";
import {
  Button,
  Stack,
  TextField,
  Divider,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const SignupPage = () => {
  const navigate = useNavigate();
  const paperStyle = {
    padding: "30px 20px 20px 20px",
    width: 300,
    top: "50%",
    left: "50%",
    margin: "-250px 0 0 -150px",
    position: "absolute",
  };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const buttonStyle = { width: "100%" };
  const marginTop = { marginTop: 5 };

  const initialValues = {
    userName: "",
    email: "",
    password: "",
    role: "USER",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password should be minimum 8 characters!")
      .required("Please enter password!")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number")
  });

  const api = axios.create({
    baseURL: `http://localhost:8080/api`,
  });

  const signupUser = async (values) => {
    const response = await api.post(`/signup`, values);
    if (response.data.status === true) {
      navigate("/api/login", { replace: true });
    }
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account!
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => signupUser(values)}
        >
          {(values, handleChange, handleSubmit, errors, touched) => (
            <Form onSubmit={handleSubmit} style={marginTop}>
              <Stack spacing={2}>
                <TextField
                  type="text"
                  name="userName"
                  label="User Name"
                  variant="outlined"
                  placeholder="Enter your User Name"
                  required
                  value={values.userName}
                  onChange={handleChange}
                />
                <ErrorMessage name="userName" />
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
                <ErrorMessage name="email" />
                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  placeholder="Enter your Password"
                  required
                  value={values.password}
                  onChange={handleChange}
                />
                <ErrorMessage name="password" />
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Role
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="role"
                    defaultValue="USER"
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="ADMIN"
                      control={<Radio />}
                      label="Admin"
                    />
                    <FormControlLabel
                      value="USER"
                      control={<Radio />}
                      label="User"
                    />
                  </RadioGroup>
                </FormControl>
                <Divider />
                <Button
                  type="submit"
                  size="medium"
                  variant="contained"
                  color="primary"
                  style={buttonStyle}
                >
                  Register
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default SignupPage;
