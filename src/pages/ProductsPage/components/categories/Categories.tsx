import './Categories.css';
import { CategoriesResponse } from '@/pages/index';
import { AccordionItem } from '@/shared/ui/index';
import { useState } from 'react';

interface CategoriesProps {
    categories?: CategoriesResponse;
}

export const Categories = ( {categories}: CategoriesProps ) => {

    const [isSelected, setIsSelected] = useState(false)
    const handleClick = () => {
        setIsSelected(!isSelected);
    }
    
    return(
        <div className='categories'>
            <h3 className='categories__title'>Categories</h3>
            {categories?.map((category, index) => 
                <AccordionItem
                    category={category.name}
                    isSelected={isSelected}
                    onSelect={handleClick}
                    isLast={index === categories.length - 1}
                />
            )}
        </div>
    )
}