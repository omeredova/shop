import './LimitDropdown.css';
import { useProductsFilter } from '../../hooks/useProductsFilters';

export const LimitDropdown = () => {
    const { limit, setFilter } = useProductsFilter();

    return (
        <label className="limit-dropdown">
            <select
                aria-label="Products per page"
                value={limit}
                onChange={(event) => setFilter('limit', event.target.value)}
            >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            </select>
        </label>
    )
}