import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

interface SetFilterOptions {
    replace?: boolean;
}

export const useProductsFilter = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();

    const category = searchParams.get('category') ?? '';
    const search = searchParams.get('search') ?? '';
    const limit = searchParams.get('limit') ?? '30';
    const skip = searchParams.get('skip') ?? '';

    const setFilter = useCallback((key: string, value: string, options?: SetFilterOptions) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);

            if (key === 'category' || key === 'search' || key === 'limit') {
                params.delete('skip');
            }

            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }

            return params;
        }, {
            replace: options?.replace ?? false,
        });
    }, [setSearchParams])

    const resetFilters = useCallback(() => {
        setSearchParams(() => ({}), { replace: true });
    }, [setSearchParams]);

    return {
        category,
        search,
        limit,
        skip,
        setFilter,
        resetFilters
    }
}