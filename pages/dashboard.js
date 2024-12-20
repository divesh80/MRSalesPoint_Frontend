import { useState } from 'react';
import { isAuthenticated } from '../utils/auth';
import { useRouter } from 'next/router';
import Layout from '../components/Layout'; // Import Layout

const Dashboard = () => {
    const router = useRouter();
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Check if the user is authenticated
    if (!isAuthenticated()) {
        router.push('/login');
        return null;
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadImage = async () => {
        if (!file) return null;

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:3000/products/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        return data.imageUrl; // Return the image URL
    };

    const createProduct = async (e) => {
        e.preventDefault();

        // Upload image first, then proceed with product creation
        const uploadedImageUrl = await uploadImage();

        if (uploadedImageUrl) {
            const productData = {
                name,
                description,
                price: parseFloat(price),
                imageUrl: uploadedImageUrl,
            };

            const response = await fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            const data = await response.json();

            if (data) {
                // Show success message and clear form
                setSuccessMessage('Product created successfully!');
                setName('');
                setDescription('');
                setPrice('');
                setFile(null);
                setImageUrl('');
            } else {
                setSuccessMessage('Error creating product');
            }
        } else {
            setSuccessMessage('Error uploading image');
        }
    };

    return (
        <Layout renderHeader={true}>
            <div className='dashboard-container'>
                <h2>Create Product</h2>
                <form onSubmit={createProduct}>
                    <div>
                        <label>Name:</label>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label>Description:</label>
                        <input
                            type='text'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input type='number' value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </div>
                    <div>
                        <label>Upload Image:</label>
                        <input type='file' onChange={handleFileChange} required />
                    </div>
                    <button type='submit' disabled={!name || !description || !price || !file}>
                        Create Product
                    </button>
                </form>

                {successMessage && (
                    <div>
                        <h3>{successMessage}</h3>
                    </div>
                )}

                {imageUrl && (
                    <div>
                        <h3>Uploaded Image Preview:</h3>
                        <img src={imageUrl} alt='Uploaded' width='200' />
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Dashboard;
