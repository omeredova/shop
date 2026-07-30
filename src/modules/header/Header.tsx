import './Header.css';
import { Link } from 'react-router-dom';
import {
    CartIcon,
    LogoIcon,
    LogoutIcon,
    ProfileIcon,
} from '@/shared/assets/icons';
import { SearchForm } from '@/shared/ui';
import { useProductsFilter, useAppSelector, useAppDispatch } from '@/shared';
import { logout } from '@/app/store';

export const Header = () => {

    const { resetFilters } = useProductsFilter();
    const user = useAppSelector(state => state.auth.user);
    const productCount = useAppSelector(state => state.cart.totalQuantity);
    const dispatch = useAppDispatch();

    return(
        <header className="header">
            <div className="header__left">
                <Link className="header__link" onClick={() => resetFilters()} to="/" aria-label="Shop home">
                    <span aria-hidden="true"><LogoIcon /></span>
                </Link>
                <SearchForm />
            </div>
            
            <div className="header__right">
                <Link className="header__icon" to={user ? '/cart' : '/account/login'} aria-label="Cart">
                    <span aria-hidden="true"><CartIcon /></span>
                    <span className="header__count">{productCount}</span>
                </Link>
                <Link className="header__icon" to={user ? '/profile' : '/account/login'} aria-label="Profile">
                    <span aria-hidden="true"><ProfileIcon/></span>
                </Link>
                <Link
                    className="header__icon"
                    to="/account/login"
                    onClick={() => dispatch(logout())}
                    aria-label="Log out"
                >
                    <span aria-hidden="true"><LogoutIcon /></span>
                </Link>
            </div>
        </header>
    )
}