import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

const CatalogPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:3000/products');
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    return (
        <Layout>
            <h1 className='catalog-title'>Product Catalog</h1>
            <div className='catalog'>
                {products.map((product) => (
                    <div className='product-card' key={product.id}>
                        <div className='product-image-container'>
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className='product-image'
                                width={250} // Fixed width for the image
                                height={180} // Fixed height for the image
                            />
                        </div>
                        <div className='product-details'>
                            <h3 className='product-name'>{product.name}</h3>
                            <p className='product-description'>{product.description}</p>
                            <p className='product-price'>${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default CatalogPage;
