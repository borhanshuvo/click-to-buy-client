import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const AddProduct = () => {
    const [imageURL, setImageURL] = useState(null);
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        const productData = {
            product_name: data.product_name,
            wight: data.wight,
            price: data.price,
            imageURL: imageURL
        };
        const url = `https://fierce-shelf-14475.herokuapp.com/addProduct`;

        fetch(url, {
          method: 'POST', 
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(productData)
        })
        .then(res => {
            
        })
      };

      const handleImageUpload = event => {
        // console.log(event.target.files[0])
        const imageData = new FormData();
        imageData.set('key', '4512136b4dae1408b103199b3ec8b044');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', 
        imageData)
        .then(function (response) {
          setImageURL(response.data.data.display_url);
        })
        .catch(function (error) {
        //   console.log(error);
        });
      }

    return (
        <div>
            <h4>Add Product</h4>
            <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-6">
                    <label className="form-label">Product Name</label>
                    <input name="product_name" className="form-control" defaultValue="" ref={register} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Product Wight</label>
                    <input name="wight" className="form-control" defaultValue="" ref={register} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Product Price</label>
                    <input name="price" className="form-control" defaultValue="" ref={register} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Product Image</label>
                    <input name="image" type="file" className="form-control" onChange={handleImageUpload} />
                </div>
                <div className="col-12">
                    <input type="submit" className="btn btn-primary" value="Add Product" />
                </div>
                
            </form>
        </div>
    );
};

export default AddProduct;