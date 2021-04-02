import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

const Checkout = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const history = useHistory();

    useEffect(() => {
        fetch(`https://fierce-shelf-14475.herokuapp.com/product/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data))
    }, [id]);

    const handelProceedCheckout = (id) => {
        history.push(`/shipment/${id}`);
    }
    return (
        <div className="container">
            <h4>Checkout</h4>
            <div className="container card mt-5">
                <div className="card-body">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            <tr>
                                <td>{product.product_name} - {product.wight}</td>
                                <td>৳ {product.price}</td>
                            </tr>
                            }
                        </tbody>

                    </table>
                </div>
                <div className="card-footer" style={{borderTop: 'none'}}>
                    <div class="d-flex justify-content-between">
                        <p></p>
                        <button onClick={() => handelProceedCheckout(product._id)} className="btn btn-primary">Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;