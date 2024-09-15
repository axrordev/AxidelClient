import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct import for jwtDecode

const ItemPage = () => {
	const [items, setItems] = useState([]); // Initialize items as an empty array
	const [itemName, setItemName] = useState(""); // For new item creation
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
			const userId = decodedToken.Id; // Extract 'Id' from the token payload
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
					`https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Collection/${collectionId}`,
				);
				setItems(response.data.data.items || []); // Access correct data path (response.data.data.items)
				console.log(response.data.data.items); // Log to verify data structure
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
			collectionId: parseInt(collectionId, 10), // Ensure collectionId is a number
			userId: userId,
		};

		try {
			const token = localStorage.getItem("token");

			const response = await axios.post(
				"https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Items",
				newItem,
				{
					headers: {
						Authorization: `Bearer ${token}`, // Include token in Authorization header
					},
				},
			);
			console.log("Item created successfully:", response.data);
			setItemName(""); // Reset the itemName input field

			// Fetch updated items after creating a new one
			const updatedItemsResponse = await axios.get(
				`https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Collection/${collectionId}`,
			);
			setItems(updatedItemsResponse.data.data.items || []); // Access correct data path
		} catch (error) {
			console.error("Error creating item:", error);
		}
	};

	return (
		<div>
			<div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg">
				<h2 className="text-2xl font-bold mb-4">Create New Item</h2>
				<form
					onSubmit={handleSubmit}
					className="space-y-4"
				>
					<div>
						<label
							htmlFor="itemName"
							className="block text-sm font-medium text-gray-700"
						>
							Item Name:
						</label>
						<input
							type="text"
							id="itemName"
							value={itemName}
							onChange={(e) => setItemName(e.target.value)}
							required
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						/>
					</div>
					<button
						type="submit"
						className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						Create Item
					</button>
				</form>
			</div>

			<div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				{items.map((item) => (
					<div
						key={item.id}
						className="flex flex-col bg-white border shadow-sm rounded-xl h-full"
					>
						<div className="p-4 md:p-5 flex-grow">
							<h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
							<a
								className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
								href="/"
							>
								View Item
							</a>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ItemPage;
