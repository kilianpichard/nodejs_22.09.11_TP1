import { Card, Button, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

interface IUser {
	email: string;
	role: string;
}

export const Header = () => {
	const token = localStorage.getItem("token");

	const [user, setUser] = useState<IUser>();

	useEffect(() => {
		let api = "http://localhost:8080/user/me";
		axios
			.get(api, {
				headers: {
					Authorization: token,
				},
			})
			.then((res: any) => {
				console.log(res.data);
				setUser(res.data);
			});
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
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
					{user && <h1>Welcome {user.email}</h1>}
					<Stack direction="row" spacing={2}>
						<Button onClick={handleHome}>Home</Button>
						{user?.role === "admin" && (
							<Button onClick={handleNewPost}>New Post</Button>
						)}
						<Button onClick={handleLogout}>Logout</Button>
					</Stack>
				</Stack>
			) : (
				<></>
			)}
		</Card>
	);
};
