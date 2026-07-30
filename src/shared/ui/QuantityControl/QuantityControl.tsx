import './QuantityControl.css';
import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';

interface QuantityControlProps {
    quantity: number;
    onQuantityChange: (quantity: number) => void;
    onIncrement: () => void;
    onDecrement: () => void;
    incrementLabel: string;
    decrementLabel: string;
    className?: string;
}

export const QuantityControl = ({
    quantity,
    onQuantityChange,
    onIncrement,
    onDecrement,
    incrementLabel,
    decrementLabel,
    className = '',
}: QuantityControlProps) => {
    const [inputValue, setInputValue] = useState(String(quantity));

    useEffect(() => {
        setInputValue(String(quantity));
    }, [quantity]);

    const commitQuantity = () => {
        const nextQuantity = Number(inputValue);

        if (!Number.isInteger(nextQuantity) || nextQuantity < 0) {
            setInputValue(String(quantity));
            return;
        }

        if (nextQuantity !== quantity) {
            onQuantityChange(nextQuantity);
        }
    };

    return (
        <div className={`quantity-control ${className}`}>
        <Button
            className="quantity-control__button"
            onClick={onDecrement}
            disabled={quantity === 0}
            aria-label={decrementLabel}
        >
            -
        </Button>
        <input
            className={`quantity-control__input ${
                quantity === 0 ? 'quantity-control__input_hidden' : ''
            }`}
            type="number"
            min="0"
            step="1"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onBlur={commitQuantity}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    event.currentTarget.blur();
                }

                if (event.key === 'Escape') {
                    setInputValue(String(quantity));
                    event.currentTarget.blur();
                }
            }}
            aria-label="Product count"
        />
        <Button
            className="quantity-control__button"
            onClick={onIncrement}
            aria-label={incrementLabel}
        >
            +
        </Button>
        </div>
    );
};