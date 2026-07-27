import './Breadcrumb.css';
import { Link } from 'react-router-dom';
import { ShapeIcon } from '@/shared/assets/icons';

type BreadcrumbItem = {
    label: string;
    to?: string;
};

type BreadcrumbProps = {
    items: BreadcrumbItem[];
};

export const Breadcrumb = ({ items }: BreadcrumbProps) => (
    <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol>
            {items.map((item, index) => {
                const isCurrent = index === items.length - 1;

                return (
                    <li className="breadcrumb__item" key={`${item.label}-${index}`}>
                        {index > 0 && (
                            <span className="breadcrumb__separator" aria-hidden="true">
                                <ShapeIcon />
                            </span>
                        )}
                        {item.to && !isCurrent ? (
                            <Link to={item.to}>{item.label}</Link>
                        ) : (
                            <span aria-current={isCurrent ? 'page' : undefined}>
                                {item.label}
                            </span>
                        )}
                    </li>
                );
            })}
        </ol>
    </nav>
);