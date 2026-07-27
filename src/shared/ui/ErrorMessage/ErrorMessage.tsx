import './ErrorMessage.css';
import { Button } from '../Button/Button';

interface ErrorMessageProps {
    message?: string;
    onRetry?: () => void;
}

export const ErrorMessage = ({
    message = 'Something went wrong. Please try again.',
    onRetry,
}: ErrorMessageProps) => {
    return (
        <div className="error-message" role="alert">
            <p>{message}</p>
            {onRetry && (
                <Button className="error-message__retry" onClick={onRetry}>
                    Try again
                </Button>
            )}
        </div>
    );
};