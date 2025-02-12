import './cart-dropdown.styles.jsx';
import { useNavigate } from 'react-router-dom';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import {useSelector} from 'react-redux';
import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles';
import {selectCategoriesMap} from '../../store/category/category.selector';
import { selectCartItems } from '../../store/cart/cart.selector.js';

const CartDropdown = () => {
    
    const cartItems = useSelector(selectCartItems); 
    const categoriesMap = useSelector(selectCategoriesMap);
    const navigate = useNavigate();
    console.log(categoriesMap);
    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }
    return(
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length? (cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)) 
                :
                <EmptyMessage>Your cart is empty</EmptyMessage> 
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;