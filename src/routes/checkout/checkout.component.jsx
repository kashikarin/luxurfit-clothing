import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import {CheckoutContainer, CheckoutHeader, HeaderBlock, Total} from './checkout.styles';

const Checkout = () => {
    const {cartTotal, cartItems} = useContext(CartContext);
    console.log(cartItems);
    return(
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
                {cartItems.map(cartItem => <CheckoutItem key={cartItem.id} item={cartItem} />
                )}
                <Total>Total: ${cartTotal}</Total>
        </CheckoutContainer>
    )
}

export default Checkout;

