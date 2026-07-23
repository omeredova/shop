import './Button.css';

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
}

export const Button = ({ children, className = '' }: ButtonProps) => {
    return (
        <button className={`button ${className}`} type="submit">
            {children}
        </button>
    );
};