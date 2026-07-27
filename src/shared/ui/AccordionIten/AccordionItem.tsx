import './AccordionItem.css';

interface CategoryItemProps {
    label: string;
    value: string;
    isSelected: boolean;
    isLast: boolean;
    onSelect: () => void;
}

export const AccordionItem = ( { label, isSelected, isLast, onSelect }: CategoryItemProps) => {

    return (
        <div className='accordion-item'>
            <button
                className={`
                    accordionButton 
                    ${isSelected ? 'active' : ''} 
                    ${isLast ? 'last' : ''}
                `}
                onClick={onSelect}
            >
                {label}
            </button>
        </div>
    )
}