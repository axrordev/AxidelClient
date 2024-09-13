import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ItemPage = () => {
	const [items, setItems] = useState([]);
	const [itemName, setItemName] = useState("");
	const { collectionId } = useParams(); // URL dan collectionId ni olamiz

	// Sahifa yuklanganda itemlarni olish
	useEffect(() => {
		const fetchItems = async () => {
			try {
				const itemResponse = await axios.get(
					`https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Items?collectionId=${collectionId}`
				);
				setItems(itemResponse.data.data); // Itemlarni saqlash
			} catch (error) {
				console.error("Error fetching items:", error);
			}
		};

		fetchItems();
	}, [collectionId]);

	// Yangi item yaratish funksiyasi
	const handleSubmit = async (event) => {
		event.preventDefault();

		const newItem = {
			name: itemName,
			collectionId: parseFloat(collectionId) // URL dan olingan collectionId ni ishlatamiz
		};

		try {
			const response = await axios.post(
				"https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Items",
				newItem
			);
			console.log("Item created successfully:", response.data);
			setItemName("");

			// Yangi item qo'shilgandan keyin itemlarni qayta yuklash
			const updatedItemsResponse = await axios.get(
				`https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Items?collectionId=${collectionId}`
			);
			setItems(updatedItemsResponse.data.data);
		} catch (error) {
			console.error("Error creating item:", error);
		}
	};

	return (
		<div>
			<h1>Items in Collection {collectionId}</h1>

			{/* Mavjud itemlarni ko'rsatish */}
			<ul>
				{items.map((item) => (
					<li key={item.id}>
						<h3>{item.name}</h3>
						<p>Author: {item.user.firstName} {item.user.lastName}</p>
						<p>Email: {item.user.email}</p>
					</li>
				))}
			</ul>

			{/* Yangi item yaratish formasi */}
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
