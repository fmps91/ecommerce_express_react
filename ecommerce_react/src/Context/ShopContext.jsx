import React, { createContext, useState } from 'react'
//import all_product from '../assets/all_product'
import { useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext();


const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;

    }

    return cart;
}

const ShopContextProvider = (props) => {

    const [all_product, setAll_Product] = useState([])

    const [cartItems, setCartItems] = useState([]);


    const getToken = localStorage.getItem('token');
    

    useEffect(() => {
        
        getAllData();

    }, [])


    const getAllData=()=>{
        try {
            axios.get('http://localhost:4000/allproducts')
                .then((e) => {
                    console.log("data: ", e.data)
                    setAll_Product(e.data.products)

                })

            if (getToken) {

                try {

                    const config = {
                        headers: {
                            'Authorization': `Bearer ${getToken}`,
                            'Content-Type': 'application/json'
                        }
                    };

                    axios.post('http://localhost:4000/getcart', {}, config)
                        .then((e) => {
                            console.log("user: ", e)
                            console.log("esto: ",e.data.user)
                            setCartItems(e.data.user)
                        })
                } catch (error) {
                    console.log("error: ", error)
                }
            }

        } catch (error) {
            console.log("error: ", error)
        }
    }

    const addToCart = (itemId) => {
        //console.log("itemid: ",typeof(itemId))
        console.log("cartItems: ",cartItems)
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))

        console.log("token: ",getToken)
        if (getToken) {

            try {

                const config = {
                    headers: {
                        'Authorization': `Bearer ${getToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                axios.post('http://localhost:4000/addtocart', { "itemId": itemId }, config)
                    .then((e) => {
                        console.log("data: ", e.data)
                        //setAll_Product(e.data)
                    })
            } catch (error) {
                console.log("error: ", error)
            }
        }
    }

    const removeToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

        if (getToken) {

            //console.log("entro aqui: ",token)
            try {

                const config = {
                    headers: {
                        'Authorization': `Bearer ${getToken()}`,
                        'Content-Type': 'application/json'
                    }
                };
                axios.post('http://localhost:4000/addtocart', { "itemId": itemId }, config)
                    .then((e) => {
                        console.log("data: ", e.data)
                        setAll_Product(e.data)
                    })
            } catch (error) {
                console.log("error: ", error)
            }
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemIfo = all_product.find((product) => product.id === Number(item));

                totalAmount += cartItems[item] * itemIfo.new_price;
            }

        }
        return totalAmount;

    }

    const getTotalCartItems = () => {
        let totalItems = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItems += cartItems[item];
            }
        }
        return totalItems;
    }


    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeToCart, getAllData };

    return <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
}

export default ShopContextProvider;
