import './App.css';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Admin from './components/Admin/Admin';
import Header from './components/Header/Header';
import Order from './components/Order/Order';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Checkout from './components/Checkout/Checkout';
import Shipment from './components/Shipment/Shipment';
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
          <Switch>

            <Route exact path="/">
              <Home />
            </Route>

            <PrivateRoute path="/admin">
              <Admin />
            </PrivateRoute>

            <Route path="/login">
              <Login></Login>
            </Route>

            <PrivateRoute path="/order">
              <Order></Order>
            </PrivateRoute>

            <PrivateRoute path="/checkout/:id">
              <Checkout />
            </PrivateRoute>

            <PrivateRoute path="/shipment/:id">
              <Shipment />
            </PrivateRoute>

          </Switch>

      </Router>
    </UserContext.Provider>
  );
}

export default App;
