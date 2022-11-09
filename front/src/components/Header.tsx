import { Card, Button, Stack } from "@mui/material";

export const Header = () => {
	const token = localStorage.getItem("token");

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.href = "/";
	};

	const handleNewPost = () => {
		window.location.href = "/new-post";
	};

	return (
		<Card style={{ marginBottom: 50 }}>
			{token ? (
				<Stack direction="row" spacing={2}>
					<Button onClick={handleNewPost}>New Post</Button>
					<Button onClick={handleLogout}>Logout</Button>
				</Stack>
			) : (
				<></>
			)}
		</Card>
	);
};
