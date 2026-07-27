import './Pagination.css';
import ArrowIcon from '../../assets/icons/arrow.svg';

interface PaginationProps {
    skip: number;
    limit: number;
    total: number;
    disabled?: boolean;
    ariaLabel?: string;
    onSkipChange: (skip: number) => void;
}

export const Pagination = ({
    skip,
    limit,
    total,
    disabled = false,
    ariaLabel = 'Pagination',
    onSkipChange,
}: PaginationProps) => {
    if (total <= 0) return null;

    const hasPreviousPage = skip > 0;
    const hasNextPage = skip + limit < total;

    return (
        <nav className="pagination" aria-label={ariaLabel}>
            <button
                type="button"
                aria-label="Previous page"
                disabled={!hasPreviousPage || disabled}
                onClick={() => onSkipChange(Math.max(0, skip - limit))}
            >
                <span className="pagination__arrow pagination__arrow-previous" aria-hidden="true">
                    <ArrowIcon />
                </span>
            </button>
            <span>
                {skip + 1}–{Math.min(skip + limit, total)} of {total}
            </span>
            <button
                type="button"
                aria-label="Next page"
                disabled={!hasNextPage || disabled}
                onClick={() => onSkipChange(skip + limit)}
            >
                <span className="pagination__arrow pagination__arrow-next" aria-hidden="true">
                    <ArrowIcon />
                </span>
            </button>
        </nav>
    );
};