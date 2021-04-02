import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react';

const ManageProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://fierce-shelf-14475.herokuapp.com/productList')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    const deleteProduct = (id) => {
        fetch(`https://fierce-shelf-14475.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    //window.location.reload(result);
                }
            })
        const newProduct = products.filter(product => product._id !==id);
        setProducts(newProduct);
    }
    return (
        <div>
            <h4>Manage Product</h4>
            <table className="table text-center">
                <thead>
                    <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Product Wight</th>
                        <th scope="col">Product Price</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product => (
                            <tr key={product._id}>
                                <td>{product.product_name}</td>
                                <td>{product.wight}</td>
                                <td>৳ {product.price}</td>
                                <td><button style={{ border: 'none' }} onClick={() => deleteProduct(product._id)}><FontAwesomeIcon style={{ color: 'red' }} icon={faTrash} /></button></td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
        </div>
    );
};

export default ManageProduct;