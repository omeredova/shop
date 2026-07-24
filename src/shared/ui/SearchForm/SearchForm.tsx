import './SearchForm.css';
import SearchIcon from '../../assets/icons/search.svg';
import { useEffect, useState } from 'react';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { useProductsFilter } from '../../hooks/useProductsFilters';

export const SearchForm = () => {

    const { search, setFilter } = useProductsFilter();

    const [ value, setValue ] = useState(search ?? '');
    const debouncedValue = useDebouncedValue(value, search ? 400 : 0);

    useEffect(() => {
        setValue(search ?? '');
    }, [search]);

    useEffect(() => {
        const query = debouncedValue.trim();

        if(query === (search ?? '')) return;

        setFilter('search', query, { replace: true });
    }, [debouncedValue, search, setFilter]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFilter('search', value.trim(), { replace: true });
    }

    return (
        <form className='search' role='search' onSubmit={handleSubmit}>
            <div className="search__field">
                <span className="search__icon"><SearchIcon/></span>
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