import './Categories.css';
import { CategoriesResponse } from '@/pages/index';
import { AccordionItem } from '@/shared/ui/index';
import { useProductsFilter } from '@/shared';

interface CategoriesProps {
    categories?: CategoriesResponse;
}

export const Categories = ( {categories}: CategoriesProps ) => {
    
    const { category, setFilter } = useProductsFilter();
    
    return(
        <>
            <div className='categories'>
                <h3 className='categories__title'>Categories</h3>
                {categories?.map((item, index) => 
                    <AccordionItem
                        key={item.slug}
                        label={item.name}
                        value={item.slug}
                        isLast={index === categories.length - 1}
                        isSelected={category === item.slug}
                        onSelect={() =>
                            setFilter(
                                'category',
                                category === item.slug ? '' : item.slug
                            )
                        }
                    />
                )}
            </div>
            <select 
                className="categories__dropdown"
                value={category ?? ''}
                onChange={(e) => setFilter('category', e.target.value)}
            >
                <option value="">Categories</option>
                {categories?.map((item) => (
                    <option key={item.slug} value={item.slug}>
                        {item.name}
                    </option>
                ))}
            </select>
        </>
    )
}