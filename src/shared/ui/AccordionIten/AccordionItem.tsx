import './AccordionItem.css';
import ArrowIcon from '@/shared/assets/icons/arrow.svg';

interface CategoryItemProps {
    category: string;
    isSelected: boolean;
    onSelect: (isSelected: boolean) => void;
    isLast: boolean;
}

export const AccordionItem = ( { category, isSelected, onSelect, isLast }: CategoryItemProps) => {

    return (
        <div className='accordion-item'>
            <button
                className={`
                    accordionButton 
                    ${isSelected ? 'active' : ''} 
                    ${isLast ? 'last' : ''}
                `}
                onClick={() => onSelect(isSelected)}
            >
                {category}
                <ArrowIcon/>
            </button>
        </div>
    )
}