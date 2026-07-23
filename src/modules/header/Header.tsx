import './Header.css';
import { Link } from 'react-router-dom';
import CartIcon from '../../shared/assets/icons/cart.svg';
import Logo from '../../shared/assets/icons/logo.svg';
import { SearchForm } from '@/shared/ui';
import { useProductsFilter } from '@/shared';
import { useAppSelector } from '@/shared/hooks/useAppSelector';

export const Header = () => {

    const { resetFilters } = useProductsFilter();
    const user = useAppSelector(state => state.auth.user);
    const productCount = useAppSelector(state => state.cart.totalQuantity);

    return(
        <header className="header">
            <div className="header__left">
                <Link className="header__link" onClick={() => resetFilters()} to="/">
                    <Logo />
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