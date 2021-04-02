import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const { id } = useParams();
    console.log(id);
    const { register, handleSubmit } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [productDetails, setProductDetails] = useState({});

    useEffect(() => {
        fetch(`https://fierce-shelf-14475.herokuapp.com/product/${id}`)
        .then(res => res.json())
        .then(data => setProductDetails(data))
    }, [id]);

    const onSubmit = data => {
        const orderDetails = {...loggedInUser, products: productDetails, shipment: data, orderTime: new Date()};
    
        fetch('https://fierce-shelf-14475.herokuapp.com/addOrder', {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data => {
          if(data){
            alert('Order Successfully');
          }
        })
      };

    return (
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input name="displayName" defaultValue={loggedInUser.displayName} ref={register({ required: true })} placeholder="Enter Your Name" />

            <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Enter Your Email" />

            <input name="address" ref={register({ required: true })} placeholder="Enter Your Address" />

            <input name="phone" ref={register({ required: true })} placeholder="Enter Your Phone Number" />

            <input type="submit" />
        </form>
    );
};

export default Shipment;