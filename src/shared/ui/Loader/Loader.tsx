import './Loader.css';

interface LoaderProps {
    text?: string;
    fullPage?: boolean;
}

export const Loader = ({
    text = 'Loading...',
    fullPage = false,
}: LoaderProps) => {
    return (
        <div
            className={`loader ${fullPage ? 'loader_full-page' : ''}`}
            role="status"
            aria-live="polite"
        >
            <span className="loader__spinner" aria-hidden="true" />
            <span>{text}</span>
        </div>
    );
};