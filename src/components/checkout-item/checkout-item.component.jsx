import { CheckoutItemContainer, CheckoutItemImageContainer, BaseSpan, QuantitySpan, Arrow, Value} from './checkout-item.styles';
import {addItemToCart, removeItemFromCart, clearItemFromCart} from '../../store/cart/cart.action';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

const CheckoutItem = ({item}) => {
    const dispatch = useDispatch();
    const {imageUrl, name, quantity, price, id} = item;
    const cartItems = useSelector(selectCartItems);
    
    const addItemHandler = () => dispatch(addItemToCart(cartItems, item));
    
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, item));
    
    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, item));
    
    return(
        <CheckoutItemContainer>
            <CheckoutItemImageContainer>
                <img alt={name} src={imageUrl} />
            </CheckoutItemImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <QuantitySpan>
                <Arrow onClick={removeItemHandler}>
                    &#10094;
                </Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>
                    &#10095;
                </Arrow>            
            </QuantitySpan>
            <BaseSpan>{quantity * price}</BaseSpan>
            <div className='remove-button' onClick={clearItemHandler}>
                &#10005;
            </div>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;