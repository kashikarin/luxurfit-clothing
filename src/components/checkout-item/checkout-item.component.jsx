import { CheckoutItemContainer, CheckoutItemImageContainer, BaseSpan, QuantitySpan, Arrow, Value} from './checkout-item.styles';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({item}) => {
    const {imageUrl, name, quantity, price, id} = item;
    const {addItemToCart, removeItemFromCart, clearItemFromCart} = useContext(CartContext);
    
    const addItemHandler = () => addItemToCart(item)
    
    const removeItemHandler = () => removeItemFromCart(item);
    
    const clearItemHandler = () => clearItemFromCart(item);
    
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