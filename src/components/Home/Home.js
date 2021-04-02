import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';

const Home = () => {
    const [products, setProducts] = useState([]);

    const [isLoading, setLoading] = useState(true);

    function fakeRequest() {
        return new Promise(resolve => setTimeout(() => resolve(), 2500));
    }

    useEffect(() => {
        fetch('https://fierce-shelf-14475.herokuapp.com/productList')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                fakeRequest().then(() => {
                    const el = document.querySelector(".loader-container");
                    if (el) {
                        el.remove();
                        setLoading(!isLoading);
                    }
                })
            })
    }, [isLoading]);

   
    return (
        <div className="container">
            <div className="row">
                {
                    products.map(product => <Product product={product}></Product>)
                }
            </div>
        </div>
    );
};

export default Home;