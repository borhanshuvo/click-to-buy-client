import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [isLoading, setLoading] = useState(true);

    function fakeRequest() {
        return new Promise(resolve => setTimeout(() => resolve(), 2500));
    }

    useEffect(() => {
        fetch(`https://fierce-shelf-14475.herokuapp.com/orderList?email=${loggedInUser.email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setOrders(data);
                fakeRequest().then(() => {
                    const el = document.querySelector(".loader-container");
                    if (el) {
                        el.remove();
                        setLoading(!isLoading);
                    }
                })
            });
    }, [loggedInUser.email, isLoading])
    return (
        <div className="container">
            <table className="table text-center" style={{ width: '50%', margin: 'auto' }}>
                <thead>
                    <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(order => (
                            <tr key={order._id}>
                                <td>{order.products.product_name} - {order.products.wight}</td>
                                <td>৳ {order.products.price}</td>
                                <td>{order.orderTime}</td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
        </div>
    );
};

export default Order;