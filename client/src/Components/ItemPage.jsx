import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct import for jwtDecode

const ItemPage = () => {
	const [items, setItems] = useState([]);
	const [itemName, setItemName] = useState("");
	const [selectedItem, setSelectedItem] = useState(null); // Track selected item for modal
	const [comments, setComments] = useState([]); // For storing comments
	const [newComment, setNewComment] = useState(""); // For new comment input
	const { collectionId } = useParams();

	// Token decoding to extract userId
	const getUserIdFromToken = () => {
		const token = localStorage.getItem("token");
		if (!token) {
			console.error("No token found");
			return null;
		}

		try {
			const decodedToken = jwtDecode(token);
			const userId = decodedToken.Id;
			return userId;
		} catch (error) {
			console.error("Error decoding token:", error);
			return null;
		}
	};

	// Fetch items from the collection on page load
	useEffect(() => {
		const fetchItems = async () => {
			try {
				const response = await axios.get(
					`https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Collection/${collectionId}`,
				);
				setItems(response.data.data.items || []);
			} catch (error) {
				console.error("Error fetching items:", error);
			}
		};

		fetchItems();
	}, [collectionId]);

	// Fetch comments for the selected item
	const fetchComments = async (itemId) => {
		try {
			const response = await axios.get(
				`https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Comments/item/${itemId}`, // Updated GET URL
			);
			setComments(response.data.data || []);
		} catch (error) {
			console.error("Error fetching comments:", error);
		}
	};

	// Handle modal open and load comments
	const handleViewItem = (item) => {
		setSelectedItem(item);
		fetchComments(item.id); // Load comments for the selected item
	};

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
			userId: userId,
		};

		try {
			const token = localStorage.getItem("token");

			await axios.post(
				"https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Items",
				newItem,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			setItemName(""); // Reset the input field

			// Fetch updated items after creating a new one
			const updatedItemsResponse = await axios.get(
				`https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Collection/${collectionId}`,
			);
			setItems(updatedItemsResponse.data.data.items || []);
		} catch (error) {
			console.error("Error creating item:", error);
		}
	};

	// Function to submit a new comment
	const handleCommentSubmit = async (event) => {
		event.preventDefault();
		const userId = getUserIdFromToken();
		if (!userId) {
			console.error("No user ID found");
			return;
		}

		const newCommentData = {
			itemId: selectedItem.id,
			userId: userId,
			text: newComment,
		};

		try {
			const token = localStorage.getItem("token");

			await axios.post(
				"https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Comments", // Updated POST URL
				newCommentData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			setNewComment(""); // Reset comment input
			// Fetch updated comments after adding new one
			fetchComments(selectedItem.id);
		} catch (error) {
			console.error("Error adding comment:", error);
		}
	};

	// Function to close modal when clicking outside of the modal content
	const closeModalOnOutsideClick = (e) => {
		if (e.target.classList.contains("modal-overlay")) {
			setSelectedItem(null);
		}
	};

	return (
		<div>
			<div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg dark:bg-gray-800">
				<form
					onSubmit={handleSubmit}
					className="space-y-4"
				>
					<div>
						<label
							htmlFor="itemName"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Item Name:
						</label>
						<input
							type="text"
							id="itemName"
							value={itemName}
							onChange={(e) => setItemName(e.target.value)}
							required
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
						className="flex flex-col bg-white border shadow-sm rounded-xl h-full dark:bg-gray-900 dark:border-gray-700"
					>
						<div className="p-4 md:p-5 flex-grow">
							<h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
								{item.name}
							</h3>
							<button
								className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
								onClick={() => handleViewItem(item)}
							>
								View Item
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Modal for viewing item and comments */}
			{selectedItem && (
				<div
					className="fixed inset-0 flex items-center justify-center z-50 modal-overlay bg-gray-800 bg-opacity-75"
					onClick={closeModalOnOutsideClick} // Close modal on click outside content
				>
					<div
						className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-md sm:w-full h-full overflow-hidden"
						onClick={(e) => e.stopPropagation()}
					>
						<h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
							{selectedItem.name}
						</h2>

						{/* Comments */}
						<div className="mt-4">
							<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
								Comments:
							</h3>

							{/* Scrollable comments section */}
							<div className="space-y-4 mt-2 max-h-[60vh] overflow-y-auto p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
								{comments.length > 0 ? (
									comments.map((comment) => (
										<div
											key={comment.id}
											className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
										>
											<p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
												{comment.user.firstName}
											</p>
											<p className="text-sm text-gray-600 dark:text-gray-300">
												{comment.text}
											</p>
										</div>
									))
								) : (
									<p className="text-sm text-gray-600 dark:text-gray-300">
										No comments yet.
									</p>
								)}
							</div>
						</div>

						{/* New comment form */}
						{localStorage.getItem("token") && (
							<form
								onSubmit={handleCommentSubmit}
								className="mt-4"
							>
								<textarea
									value={newComment}
									onChange={(e) => setNewComment(e.target.value)}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
									placeholder="Add your comment"
								/>
								<button
									type="submit"
									className="mt-2 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									Add Comment
								</button>
							</form>
						)}

						<button
							className="mt-4 py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
							onClick={() => setSelectedItem(null)} // Close modal
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ItemPage;
