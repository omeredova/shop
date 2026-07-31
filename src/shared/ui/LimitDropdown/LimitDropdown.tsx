import './LimitDropdown.css';
import { useProductsFilter } from '../../hooks/useProductsFilters';
import ArrowIcon from '../../assets/icons/arrow.svg';

export const LimitDropdown = () => {
    const { limit, setFilter } = useProductsFilter();

    return (
        <label className="limit-dropdown">
            <span className="limit-dropdown__label">Show</span>
            <span className="limit-dropdown__select-wrapper">
                <select
                    className="limit-dropdown__select"
                    aria-label="Products per page"
                    value={limit}
                    onChange={(event) => setFilter('limit', event.target.value)}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
                <span className="limit-dropdown__icon" aria-hidden="true">
                    <ArrowIcon />
                </span>
            </span>
            <span className="limit-dropdown__label">per page</span>
        </label>
    );
};