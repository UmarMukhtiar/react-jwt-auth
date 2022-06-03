import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate, Outlet } from "react-router-dom";
import AuthServices from "../services/auth.services";

const NavBar = () => {
  const navigation = useNavigate("");
  const handleLogout = () => {
    AuthServices.logout();
    navigation("/api/login", { replace: true });
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Student CRUD
            </Typography>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={() => {
                  navigation("/api/home/students");
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Students
              </Button>
              <Button
                onClick={() => {
                  navigation("/api/home/sections");
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Section
              </Button>
            </Box>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};
export default NavBar;
