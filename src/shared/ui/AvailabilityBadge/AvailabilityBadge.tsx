import './AvailabilityBadge.css';
import type { AvailabilityStatus } from '@/pages/ProductsPage';

interface AvailabilityBadgeProps {
    status: AvailabilityStatus;
}

export const AvailabilityBadge = ({ status }: AvailabilityBadgeProps) => {
    return (
        <span className={`availability availability_${status.replace(' ', '-').toLowerCase()}`}>
            {status}
        </span>
    );
};