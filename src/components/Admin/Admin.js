import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import AddProduct from '../AddProduct/AddProduct';
import ManageProduct from '../ManageProduct/ManageProduct';

const Admin = () => {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <Link className="nav-link" to="/admin/manageProduct">Manage Product</Link>
                        <Link className="nav-link" to="/admin/addProduct">Add Product</Link>
                    </div>
                    <div className="col-md-9">
                        <Switch>
                            <Route path="/admin/manageProduct">
                                <ManageProduct></ManageProduct>
                            </Route>
                            <Route path="/admin/addProduct">
                                <AddProduct></AddProduct>
                            </Route>
                        </Switch>                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;