import { Card, Button } from "@mui/material";

export const Header = () => {
	const token = localStorage.getItem("token");

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.href = "/";
	};

	return (
		<Card>
			{token ? <Button onClick={handleLogout}>Logout</Button> : <></>}
		</Card>
	);
};
