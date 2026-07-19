import { useSearchParams } from "react-router-dom";

export const useProductsFilter = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();

    const category = searchParams.get('category');

    const setFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);

        if(value){
            params.set(key, value)
        } else {
            params.delete(key)
        }

        setSearchParams(params)
    }

    return {
        category,
        setFilter
    }
}