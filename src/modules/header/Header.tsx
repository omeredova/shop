import './Header.css';
import { Link } from 'react-router-dom';
import { CartIcon, LogoIcon, ProfileIcon } from '@/shared/assets/icons';
import { SearchForm } from '@/shared/ui';
import { useProductsFilter, useAppSelector } from '@/shared';

export const Header = () => {

    const { resetFilters } = useProductsFilter();
    const user = useAppSelector(state => state.auth.user);
    const productCount = useAppSelector(state => state.cart.totalQuantity);

    return(
        <header className="header">
            <div className="header__left">
                <Link className="header__link" onClick={() => resetFilters()} to="/">
                    <LogoIcon />
                </Link>
                <SearchForm />
            </div>
            
            <div className="header__right">
                <div className="header__basket">
                    <Link className="header__icon" to={user ? '/cart' : '/account/login'} >
                        <CartIcon />
                    </Link>
                    {productCount}
                </div>
                <Link className="header__icon" to={user ? '/profile' : '/account/login'}>
                    <ProfileIcon/>
                </Link>
            </div>
        </header>
    )
}