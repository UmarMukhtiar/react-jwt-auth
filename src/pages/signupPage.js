import { Paper, Grid, Avatar, Typography } from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import { Formik, Form } from "formik";
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

const SignupPage = () => {
  const navigate = useNavigate();

  const paperStyle = {
    padding: "30px 20px 20px 20px",
    width: 300,
    top: "50%",
    left: "50%",
    margin: '-250px 0 0 -150px',
    position: "absolute"
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

  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const api = axios.create({
    baseURL: `http://localhost:8080/api`,
  });

  const signupUser = async () => {
    const response = await api.post(`/signup`, formValues);
    if (response.data.status === true) {
      navigate('/api/login', {replace: true})
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
        <Formik initialValues={formValues} onSubmit={signupUser}>
          {() => (
            <Form style={marginTop}>
              <Stack spacing={2}>
                <TextField
                  type="text"
                  name="userName"
                  label="User Name"
                  variant="outlined"
                  placeholder="Enter your User Name"
                  required
                  value={formValues.userName}
                  onChange={handleChange}
                />
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
                  variant="outlined"
                  placeholder="Enter your Password"
                  required
                  value={formValues.password}
                  onChange={handleChange}
                />
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
