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
                <Link className="header__link" onClick={() => resetFilters()} to="/" aria-label="Shop home">
                    <span aria-hidden="true"><LogoIcon /></span>
                </Link>
                <SearchForm />
            </div>
            
            <div className="header__right">
                <div className="header__basket">
                    <Link className="header__icon" to={user ? '/cart' : '/account/login'} aria-label="Cart">
                        <span aria-hidden="true"><CartIcon /></span>
                    </Link>
                    {productCount}
                </div>
                <Link className="header__icon" to={user ? '/profile' : '/account/login'} aria-label="Profile">
                    <span aria-hidden="true"><ProfileIcon/></span>
                </Link>
            </div>
        </header>
    )
}