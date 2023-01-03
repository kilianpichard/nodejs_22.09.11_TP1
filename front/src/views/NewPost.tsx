import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import React from "react";

export const NewPost = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const handleSubmit = () => {
    axios
      .post(
        "http://localhost:8080/posts",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        window.location.href = "/";
      });
  };

  return (
    <Stack spacing={2} justifyContent="center" alignItems="stretch">
      <h1>New Post</h1>
      <TextField
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField
        label="Content"
        variant="outlined"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Button variant="contained" onClick={handleSubmit}>
        Post
      </Button>
    </Stack>
  );
};
