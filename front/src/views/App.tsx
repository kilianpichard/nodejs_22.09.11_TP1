import React, { useEffect, useState } from "react";
import { Register } from "../views/Register";
import { Login } from "../views/Login";
import { Posts } from "../views/Posts";
import { Container } from "@mui/material";
import { NewPost } from "../views/NewPost";
import { Header } from "../components/Header";
import axios from "axios";

interface IUser {
	email: string;
	role: string;
}

function App() {
	const token = localStorage.getItem("token");

	//check if /login or /register
	const path = window.location.pathname;

	useEffect(() => {
		let api = "http://localhost:8080/user/me";
		axios
			.get(api, {
				headers: {
					Authorization: token,
				},
			})
			.then((res: any) => {
				const isAdmin = res.data.role === "admin";
				if (!isAdmin && path === "/new-post") {
					window.location.href = "/";
				}
			});
	}, []);

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
		<div style={{ backgroundColor: "#FAFAFA" }}>
			<Header />
			<Container maxWidth="lg">
				{path === "/" && token ? (
					<Posts />
				) : path === "/new-post" && token ? (
					<NewPost />
				) : path === "/login" ? (
					<Login />
				) : path === "/register" ? (
					<Register />
				) : (
					<Login />
				)}
			</Container>
		</div>
	);
}

export default App;
