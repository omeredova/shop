import './Button.css';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const Button = ({ children, className = '',
    type = 'button',
    ...props
}: ButtonProps) => {
    return (
        <button className={`button ${className}`} type={type} {...props}>
            {children}
        </button>
    );
};