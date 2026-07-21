import './SearchForm.css';
import SearchIcon from '../../assets/icons/search.svg';
import { useProductsFilter } from '@/shared/hooks/useProductsFilters';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
import React, { useEffect, useState } from 'react';

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

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e:React.SyntheticEvent<HTMLFormElement>) => {
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