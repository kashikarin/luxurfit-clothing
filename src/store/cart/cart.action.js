import { createAction } from '../../utils/reducer/reducer.utils';
import {CART_ACTION_TYPES} from './cart.types';
import { useDispatch } from 'react-redux';

//setCartitems helper functions
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

//action creators
export const addItemToCart = (cartItems, cartItemToAdd) => {
    const newCartItems = addCartItem(cartItems, cartItemToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove); 
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}


export const setIsCartOpen = (bool) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

