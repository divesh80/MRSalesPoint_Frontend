import Image from 'next/image';

const ProductCard = ({ product }) => {
    return (
        <div className='product-card'>
            <div className='product-image-container'>
                <Image
                    src={product.imageUrl.trimEnd()}
                    alt={product.name}
                    width={250} // Fixed width for the image
                    height={180} // Fixed height for the image
                    objectFit='cover' // Ensures image is cropped to fit the container
                    objectPosition='center' // Keeps the image centered in the container
                />
            </div>
            <h3 className='product-name'>{product.name}</h3>
            <p className='product-description'>{product.description}</p>
            <p className='product-price'>${product.price}</p>
        </div>
    );
};

export default ProductCard;
