import { Card, Button, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import jwt from "jwt-decode";

interface IUser {
  email: string;
  role: string;
}

export const Header = () => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      const decoded: IUser = jwt(token);
      if (decoded.role === "admin") {
        setIsAdmin(true);
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/";
  };

  const handleNewPost = () => {
    window.location.href = "/new-post";
  };

  const handleHome = () => {
    window.location.href = "/";
  };

  return (
    <Card style={{ marginBottom: 50 }}>
      {token ? (
        <Stack direction="row" spacing={50}>
          <h1>Welcome {email}</h1>
          <Stack direction="row" spacing={2}>
            <Button onClick={handleHome}>Home</Button>
            {isAdmin && <Button onClick={handleNewPost}>New Post</Button>}
            <Button onClick={handleLogout}>Logout</Button>
          </Stack>
        </Stack>
      ) : (
        <></>
      )}
    </Card>
  );
};
