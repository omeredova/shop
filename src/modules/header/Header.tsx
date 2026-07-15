import './Header.css';
import { Link } from 'react-router-dom';
import CartIcon from '../../shared/assets/icons/cart.svg';
import Logo from '../../shared/assets/icons/logo.svg';
import { SearchForm } from '@/shared/ui';

export const Header = () => {

    return(
        <header className="header">
            <div className="header__left">
                <Link className="header__link" to="/">
                    <Logo />
                </Link>
                <SearchForm />
            </div>

            <div className="header__basket">
                0
                <Link className="header__cartIcon" to="/">
                    <CartIcon />
                </Link>
            </div>
        </header>
    )
}