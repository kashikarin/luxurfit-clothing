import { createContext, useEffect, useState } from 'react';


const addCartItem = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find((item) => item.id === cartItemToAdd.id);
    if (existingCartItem) {
        return cartItems.map((item) => item.id === cartItemToAdd.id?
            {...item, quantity: item.quantity + 1} : item)
    }
    return [...cartItems, {...cartItemToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find((item) => item.id === cartItemToRemove.id);
    if (existingCartItem.quantity === 1) { 
        return cartItems.filter((item) => item.id !== cartItemToRemove.id)
    }
    return cartItems.map((item) => item.id === cartItemToRemove.id?
    {...item, quantity: item.quantity - 1} : item)
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((item) => item.id !== cartItemToClear.id);


export const CartContext = createContext ({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},  
    cartCount: 0,
    setCartCount: () => {},
    total: 0,
    clearItemFromCart: () => {}
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    
    const addItemToCart = (cartItemToAdd) => {
        setCartItems(addCartItem(cartItems, cartItemToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear))
    }
    useEffect(()=>{
        const newCartCount = cartItems.reduce((accumulator, currentItem) => accumulator + currentItem.quantity, 0);
        if (newCartCount !== cartCount) {
            setCartCount(newCartCount);
        }
        }, [cartItems]);
  
    useEffect(()=>{
        const newCartTotal = cartItems.reduce((accumulator, currentItem) => accumulator + currentItem.price * currentItem.quantity, 0);
        if (newCartTotal !== cartTotal) {
          setCartTotal(newCartTotal);
        }
        }, [cartItems]);
    
        const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, cartCount, cartTotal};


    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

