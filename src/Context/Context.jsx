import React, { createContext, useContext, useReducer,useState } from "react";
import Chance from 'chance';
import { cartReducer,productReducer } from "./Reducer";
import axios from 'axios';
import imageObjects from '../Component/productimage.js';

const chance = new Chance();

export const Cart = createContext();




const Context = ({ children }) => {
  const [ account, setAccount ] = useState('');
  
  const products = [...Array(12)].map((_, index) => {
    const imageObject = imageObjects[index];
    console.log(imageObject.length)
    return {
      id: chance.guid(),
      name: chance.name(),
      price: chance.floating({ min: 1, max: 100, fixed: 2 }),
      image: imageObject.src,
      inStock: chance.pickone([0, 3, 5, 6, 7]),
      fastDelivery: chance.bool(),
      ratings: chance.pickone([1, 2, 3, 4, 5]),
    };
  });

  console.log(products);

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });
  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });


  return (
    <Cart.Provider value={{ state, dispatch,productState, productDispatch ,account, setAccount }}>
      {children}
    </Cart.Provider>
  );
};

export default Context;

export const CartState = () => {
  return useContext(Cart);
};














