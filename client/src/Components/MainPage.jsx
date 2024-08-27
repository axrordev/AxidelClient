import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainPage = () => {
  const [recentItems, setRecentItems] = useState([]);
  const [topCollections, setTopCollections] = useState([]);
  const [tags, setTags] = useState([]);
  const [newCollection, setNewCollection] = useState({
    name: '',
    description: '',
    category: '',
    imageUrl: ''
  });
  const [image, setImage] = useState(null);
  const [categories] = useState(['Books', 'Signs', 'Silverware', 'Other']); // Define categories

  useEffect(() => {
    // Fetch recent items, top collections, and tags
    axios.get('/api/items/recent').then(response => setRecentItems(response.data));
    axios.get('/api/collections/top').then(response => setTopCollections(response.data));
    axios.get('/api/tags').then(response => setTags(response.data));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setImage(files[0]);
    } else {
      setNewCollection({
        ...newCollection,
        [name]: value
      });
    }
  };

  const uploadImage = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append('image', image);
    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.url; // Assuming the response contains the image URL
    } catch (error) {
      console.error('Image upload failed:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await uploadImage();
    if (!imageUrl) return;

    const collectionData = {
      ...newCollection,
      imageUrl
    };

    try {
      await axios.post('/api/collections', collectionData);
      console.log('Collection created:', collectionData);
      // Handle success (e.g., reset form or redirect)
    } catch (error) {
      console.error('Error creating collection:', error);
    }
  };

  return (
    <div className="p-4">
      {/* Create Collection Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Create New Collection</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={newCollection.name}
            onChange={handleChange}
            placeholder="Collection Name"
            className="p-2 border rounded w-full"
            required
          />
          <textarea
            name="description"
            value={newCollection.description}
            onChange={handleChange}
            placeholder="Description"
            className="p-2 border rounded w-full"
            rows="4"
            required
          />
          <select
            name="category"
            value={newCollection.category}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
          >
            Create Collection
          </button>
        </form>
      </section>

      {/* Recently Added Items */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Recently Added Items</h2>
        <ul>
          {recentItems.map(item => (
            <li key={item.id} className="mb-2">
              <p>Name: {item.name}</p>
              <p>Collection: {item.collection}</p>
              <p>Author: {item.author}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Top 5 Largest Collections */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Top 5 Largest Collections</h2>
        <ul>
          {topCollections.map(collection => (
            <li key={collection.id} className="mb-2">
              <p>Name: {collection.name}</p>
              <p>Size: {collection.size}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Tag Cloud */}
      <section>
        <h2 className="text-xl font-bold mb-4">Tag Cloud</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <a
              key={tag.id}
              href={`/search?tag=${tag.name}`}
              className="text-blue-500 hover:underline"
            >
              {tag.name}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainPage;
