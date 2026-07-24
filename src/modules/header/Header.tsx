import './Header.css';
import { Link } from 'react-router-dom';
import { CartIcon, LogoIcon } from '@/shared/assets/icons';
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

            <div className="header__basket">
                {productCount}
                <Link className="header__cartIcon" to={user ? '/cart' : '/account/login'} >
                    <CartIcon />
                </Link>
            </div>
        </header>
    )
}