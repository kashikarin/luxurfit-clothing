import { Fragment } from 'react'; 
import { Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import {NavigationContainer, LogoContainer, NavLinksContainer, NavLink} from './navigation.styles';
import { selectCurrentUser } from '../../store/user/user.selector';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsCartOpen, selectCartItems } from '../../store/cart/cart.selector';
import {signOutStart} from '../../store/user/user.action';

const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartItems = useSelector(selectCartItems);
    
    const onSignOut = () => {
        dispatch(signOutStart());
    }
    
    return(
      <Fragment> 
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrwnLogo className='logo' />
            </LogoContainer>
            <NavLinksContainer>
                <NavLink to='/shop'>
                    SHOP
                </NavLink>
                
                {
                    currentUser? (
                        <NavLink as='span' onClick={onSignOut}>SIGN OUT</NavLink>
                    ) : (<NavLink to='/auth'>
                    SIGN IN
                </NavLink>)
                }
                <CartIcon />
            </NavLinksContainer>
            {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation;