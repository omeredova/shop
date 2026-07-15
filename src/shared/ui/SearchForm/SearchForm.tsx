import './SearchForm.css';
import SearchIcon from '../../assets/icons/search.svg';

export const SearchForm = () => {

    return (
        <form className='search' role='search'>
            <div className="search__field">
                <span className="search__icon"><SearchIcon/></span>
                <input
                    className='search__input'
                    type='search'
                    aria-label='Search for goods'
                />
            </div>
        </form>
    )
}