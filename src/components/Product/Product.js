import React from 'react';
import { useHistory } from 'react-router';

const Product = ({product}) => {
    const history = useHistory();
    const productId = (id) =>{
        const url = `checkout/${id}`;
        history.push(url);
    }
    return (
        <div className="container card mt-5" style={{ width: '18rem' }}>
            <img src={product.imageURL}  className="card-img-top" style={{ height: '250px' }} alt=""/>
            <div className="card-body">
                <h5 className="card-title text-center">{product.product_name}</h5>
            </div>
            <div className="card-footer">
                <div class="d-flex justify-content-between">
                    <p>৳ {product.price}</p>
                    <button className="btn btn-success" onClick={() => productId(product._id)}>Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default Product;