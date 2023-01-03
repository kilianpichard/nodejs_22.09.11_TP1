import React, { useEffect, useState } from "react";
import { Register } from "../views/Register";
import { Login } from "../views/Login";
import { Posts } from "../views/Posts";
import { Container } from "@mui/material";
import { NewPost } from "../views/NewPost";
import jwt from "jwt-decode";

interface IUser {
  email: string;
  role: string;
}

function App() {
  const token = localStorage.getItem("token");

  //check if /login or /register
  const path = window.location.pathname;

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      const decoded: IUser = jwt(token);
      if (decoded.role === "admin") {
        setIsAdmin(true);
      }
    }
  }, [token]);

  if (token) {
    if (path === "/login" || path === "/register") {
      window.location.href = "/";
    }
  } else {
    if (path !== "/login" && path !== "/register") {
      window.location.href = "/login";
    }
  }

  return (
    <Container maxWidth="lg">
      {path === "/" && token ? (
        <Posts />
      ) : path === "/new-post" && token && isAdmin ? (
        <NewPost />
      ) : path === "/login" ? (
        <Login />
      ) : path === "/register" ? (
        <Register />
      ) : (
        <Login />
      )}
    </Container>
  );
}

export default App;
