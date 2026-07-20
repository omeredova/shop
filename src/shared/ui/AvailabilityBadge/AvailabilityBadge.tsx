import './AvailabilityBadge.css';
import { AvailabilityStatus } from '@/pages/index';

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