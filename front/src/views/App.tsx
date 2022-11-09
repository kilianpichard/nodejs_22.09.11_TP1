import React from "react";
import { Register } from "../views/Register";
import { Login } from "../views/Login";
import { Posts } from "../views/Posts";
import { Container } from "@mui/material";
import { Header } from "../components/Header";

function App() {
	const token = localStorage.getItem("token");

	//check if /login or /register
	const path = window.location.pathname;
	const isLogin = path === "/login";

	return (
		<div style={{ backgroundColor: "#FAFAFA" }}>
			<Header />
			<Container maxWidth="lg">
				{token ? <Posts /> : isLogin ? <Login /> : <Register />}
			</Container>
		</div>
	);
}

export default App;
