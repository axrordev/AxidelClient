import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
const MyCollection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [collectionName, setCollectionName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [collections, setCollections] = useState([]); // State to store collections
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const modalRef = useRef(null);

    const openModal = () => {
        const authToken = localStorage.getItem("token");
        if (!authToken) {
            alert("You must be logged in to create a collection.");
            return;
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    };



		const getUserIdFromToken = () => {
				const token = localStorage.getItem('token'); // Get token from local storage
				if (!token) {
						console.error('No token found');
						return null;
				}
		
				try {
						const decodedToken = jwtDecode(token); // Decode the token
						const userId = decodedToken.Id; // Extract the 'Id' from the decoded token
						return userId;
				} catch (error) {
						console.error('Error decoding token:', error);
						return null;
				}
		};
		
    useEffect(() => {
			const fetchCollections = async () => {
					const userId = getUserIdFromToken();
					if (!userId) {
							console.error('User ID not found in token.');
							return;
					}
	
					try {
							const response = await axios.get(
									"https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Collection"
							);
	
							console.log("API Response:", response.data);
	
							if (Array.isArray(response.data.data)) {
									response.data.data.forEach(collection => {
											console.log(`Collection User ID: ${collection.user.id}, Token User ID: ${userId}`);
									});
	
									const filteredCollections = response.data.data.filter(
											collection => collection.user.id.toString() === userId.toString()
									);
	
									console.log("Filtered collections:", filteredCollections);
									setCollections(filteredCollections);
							} else {
									console.error("Expected an array but got:", response.data.data);
							}
					} catch (error) {
							console.error("Error fetching collections:", error);
					}
			};
	
			fetchCollections();
	}, []);
	

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        try {
            // Create FormData to handle file upload
            const formData = new FormData();
            formData.append('name', collectionName);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('userId', getUserIdFromToken());

            // Append the file to FormData if a file was selected
            if (file) {
                formData.append('file', file); // Assuming backend expects the field as 'file'
            }

            const response = await axios.post(
                'https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Collection?fileType=Images',
                formData,  // Send FormData instead of a JSON object
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',  // Set the correct content type
                    },
                }
            );

            // Add the newly created collection to the list of collections
            setCollections([...collections, response.data]);

            // Clear form and close modal
            setCollectionName('');
            setDescription('');
            setCategory('');
            setFile(null); // Clear the file input after submit
            closeModal();
        } catch (error) {
            console.error('Error creating collection:', error);
        }
    };

    return (
        <div>
            <button
                onClick={openModal}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Create Collection
            </button>

            {isModalOpen && (
                <div
                    id="crud-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
                    onClick={handleClickOutside}
                >
                    <div
                        ref={modalRef}
                        className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700"
                    >
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Create New Collection
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={closeModal}
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Collection Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={collectionName}
                                        onChange={(e) => setCollectionName(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type collection name"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="description"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        rows="4"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Write collection description here"
                                        required
                                    ></textarea>
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="category"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        id="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type collection category"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="file"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Upload Image (optional)
                                    </label>
                                    <input
                                        type="file"
                                        id="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Create Collection
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
                {collections.map((collection) => (
                    <div key={collection.id} className="bg-white p-4 rounded-lg shadow dark:bg-gray-800">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{collection.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{collection.description}</p>
                        <p className="text-gray-500 dark:text-gray-300">Category: {collection.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyCollection;
