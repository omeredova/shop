import './SearchForm.css';
import SearchIcon from '../../assets/icons/search.svg';
import { useEffect, useState } from 'react';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { useProductsFilter } from '../../hooks/useProductsFilters';

export const SearchForm = () => {

    const { search, setFilter } = useProductsFilter();
    const { pathname } = useLocation();
    const isProductsPage = pathname === '/products';

    const [ value, setValue ] = useState(isProductsPage ? search : '');
    const debouncedValue = useDebouncedValue(value, search ? 400 : 0);

    useEffect(() => {
        setValue(isProductsPage ? search : '');
    }, [isProductsPage, search]);

    useEffect(() => {
        if(!isProductsPage) return;

        const query = debouncedValue.trim();

        if(query === (search ?? '')) return;

        setFilter('search', query, { replace: true });
    }, [debouncedValue, isProductsPage, search, setFilter]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!isProductsPage) return;

        setFilter('search', value.trim(), { replace: true });
    }

    return (
        <form className='search' role='search' onSubmit={handleSubmit}>
            <div className="search__field">
                <span className="search__icon" aria-hidden="true"><SearchIcon/></span>
                <input
                    className='search__input'
                    type='search'
                    aria-label='Search for goods'
                    value={value}
                    onChange={handleChange}
                />
            </div>
        </form>
    )
}