import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const response = await axios.get('https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Collection');
                const data = response.data;

                // Check if the response is an array
                if (Array.isArray(data)) {
                    setCollections(data);
                } else {
                    console.error('Expected an array but got:', data);
                }
            } catch (error) {
                console.error('Error fetching collections:', error);
            }
        };

        fetchCollections();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.isArray(collections) && collections.map((collection) => (
                <div key={collection.id} className="flex flex-col bg-white border shadow-sm rounded-xl">
                    <img
                        className="w-full h-auto rounded-t-xl"
                        src={collection.imageId ? `https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Collection/download-image/${collection.imageId}` : 'https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80'}
                        alt={collection.name}
                    />
                    <div className="p-4 md:p-5">
                        <h3 className="text-lg font-bold text-gray-800">
                            {collection.name}
                        </h3>
                        <p className="mt-1 text-gray-500">
                            {collection.description}
                        </p>
                        <a
                            className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                            href="/"
                        >
                            Go somewhere
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomePage;
