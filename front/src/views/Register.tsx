//register page
import { useState } from "react";
import { TextField, Button, Stack, Link } from "@mui/material";
import axios from "axios";

export const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = () => {
		axios
			.post("http://localhost:8080/user/register", {
				email,
				password,
			})
			.then((res) => {
				axios
					.post("http://localhost:8080/user/login", {
						email,
						password,
					})
					.then((res) => {
						localStorage.setItem("token", res.data.token);
						window.location.href = "/";
					})
					.catch((err) => {
						setError(err.response.data.message);
					});
			})
			.catch((err) => {
				setError(err.response.data.message);
			});
	};

	return (
		<Stack spacing={2} justifyContent="center" alignItems="stretch">
			<h1>Register</h1>
			<TextField
				label="Email"
				variant="outlined"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>

			<TextField
				label="Password"
				variant="outlined"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<p>{error}</p>

			<Button variant="contained" onClick={handleSubmit}>
				Register
			</Button>

			<Button onClick={() => (window.location.pathname = "/login")}>
				Already have an account ? Login
			</Button>
		</Stack>
	);
};
