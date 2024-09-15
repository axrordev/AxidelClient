import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Make sure jwtDecode is correctly imported

const ItemPage = () => {
	const [items, setItems] = useState([]); // Store only items
	const [itemName, setItemName] = useState("");
	const { collectionId } = useParams(); // Get collectionId from the URL

	// Token decoding to extract userId
	const getUserIdFromToken = () => {
		const token = localStorage.getItem("token");
		if (!token) {
			console.error("No token found");
			return null;
		}

		try {
			const decodedToken = jwtDecode(token);
			const userId = decodedToken.Id; // Extract 'Id'
			return userId;
		} catch (error) {
			console.error("Error decoding token:", error);
			return null;
		}
	};

	// Fetch only items from the collection on page load
	useEffect(() => {
		const fetchItems = async () => {
			try {
				const response = await axios.get(
					`https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Collection/${collectionId}`
				);
				setItems(response.data.items); // Set only items from the collection
				console.log(response.data.items); // Check the data structure
			} catch (error) {
				console.error("Error fetching items:", error);
			}
		};

		fetchItems();
	}, [collectionId]);

	// Function to create a new item
	const handleSubmit = async (event) => {
		event.preventDefault();
	
		const userId = getUserIdFromToken();
		if (!userId) {
			console.error("No user ID found");
			return;
		}
	
		const newItem = {
			name: itemName,
			collectionId: parseInt(collectionId, 10),
			userId: userId
		};
	
		try {
			const token = localStorage.getItem("token");

			const response = await axios.post(
				"https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Items",
				newItem,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log("Item created successfully:", response.data);
			setItemName("");

			// Fetch updated items after creating a new one
			const updatedItemsResponse = await axios.get(
				`https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Collection/${collectionId}`
			);
			setItems(updatedItemsResponse.data.items); // Update the items list
		} catch (error) {
			console.error("Error creating item:", error);
		}
	};

	return (
		<div>
			<h1>Items in Collection {collectionId}</h1>

			{/* List the items from the collection */}
			<ul>
				{items.map((item) => (
					<li key={item.id}>
						<h3>{item.name}</h3>
						<p>Author: {item.user.firstName} {item.user.lastName}</p>
						<p>Email: {item.user.email}</p>
					</li>
				))}
			</ul>

			{/* Form to create a new item */}
			<h2>Create New Item</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="itemName">Item Name:</label>
				<input
					type="text"
					id="itemName"
					value={itemName}
					onChange={(e) => setItemName(e.target.value)}
					required
				/>
				<button type="submit">Create Item</button>
			</form>
		</div>
	);
};

export default ItemPage;
