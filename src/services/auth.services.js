import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";
class AuthService {
  login(data) {
    return axios
      .post(API_URL + "login", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.user.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        return response.data;
      });
  }

  auth() {
    return axios
      .get(API_URL + "auth", { headers: authHeader() })
      .then((response) => {
          return response.data.status;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  signup(userName, email, password, role) {
    return axios
      .post(API_URL + "signup", {
        userName,
        email,
        password,
        role,
      })
      .then((response) => {
        return response.status;
      });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();