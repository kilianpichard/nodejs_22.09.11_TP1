import { useEffect, useState } from "react";
import axios from "axios";

interface IPost {
	_id: string;
	title: string;
	content: string;
}

export const Posts = () => {
	const token = localStorage.getItem("token");
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		let api = "http://localhost:8080/posts";
		axios
			.get(api, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				console.log(res.data);
				setPosts(res.data);
			});
	}, []);

	return (
		<div>
			{posts.map((post: IPost) => (
				<div key={post._id}>
					<h1>{post.title}</h1>
					<p>{post.content}</p>
				</div>
			))}
		</div>
	);
};
