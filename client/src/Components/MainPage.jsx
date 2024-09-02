import React, { useState, useRef } from 'react';
import axios from 'axios';

const MainPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [collectionName, setCollectionName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [imageId, setImageId] = useState(null);
    const modalRef = useRef(null); // Ref for modal content

    const openModal = () => {
			const authToken = localStorage.getItem("token");
			if (!authToken) {
				alert("You must be logged in to create a collection.");
				return;
			}
			setIsModalOpen(true);
		};
    const closeModal = () => setIsModalOpen(false);

    // Close  modal
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post(
                    'https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Collection/upload-image?fileType=Images',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
                setImageId(response.data.id); 
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

		function getUserIdFromToken(token) {
			try {
					// Tokenni '.' orqali bo'lib olish
					const payloadBase64Url = token.split('.')[1];
	
					// Base64Url formatni oddiy Base64 ga aylantirish
					const payloadBase64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');
	
					// Base64 ni dekod qilish
					const decodedPayload = atob(payloadBase64);
	
					// JSON obyektiga aylantirish
					const payload = JSON.parse(decodedPayload);
	
					// Id ni olish
					return payload.Id; // 'Id' yoki 'id' bo'lishi mumkin, JWT da qanday nomlanganiga qarab
			} catch (error) {
					console.error('Error decoding token:', error);
					return null;
			}
	}

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token'); 
        try {
            await axios.post(
                'https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Collection',
                {
                    name: collectionName,
                    description,
                    category,
                    imageId,
                    userId: getUserIdFromToken(token)
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            // Clear form and close modal
            setCollectionName('');
            setDescription('');
            setCategory('');
            setImage(null);
            setImageId(null);
            closeModal();
        } catch (error) {
            console.error('Error creating collection:', error);
        }
    };


    return (
        <div>
            {/* Modal toggle button */}
            <button
                onClick={openModal}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Create Collection
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div
                    id="crud-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
                    onClick={handleClickOutside} // Click handler for closing the modal
                >
                    <div
                        ref={modalRef}
                        className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700"
                    >
                        {/* Modal header */}
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
                        {/* Modal body */}
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
                                        placeholder="Type category"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="image"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Upload Image
                                    </label>
                                    <input
                                        type="file"
                                        id="image"
                                        onChange={handleImageUpload}
                                        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <svg
                                    className="me-1 -ms-1 w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Create Collection
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainPage;
