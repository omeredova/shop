import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

interface SetFilterOptions {
    replace?: boolean;
}

export const useProductsFilter = () => {
    const [ , setSearchParams ] = useSearchParams();
    const [searchParams] = useSearchParams();

    const category = searchParams.get('category') ?? '';
    const search = searchParams.get('search') ?? '';

    const setFilter = useCallback((key: string, value: string, options?: SetFilterOptions) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);

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
        setFilter,
        resetFilters
    }
}