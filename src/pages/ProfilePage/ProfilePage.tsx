import './ProfilePage.css';
import { useAppSelector } from '@/shared';
import { Breadcrumb } from '@/shared/ui';

export const ProfilePage = () => {

    const user = useAppSelector(state => state.auth.user)

    return (
        <div className="profile-route">
            <Breadcrumb
                items={[
                    { label: 'Products', to: '/products' },
                    { label: 'Profile' },
                ]}
            />
            <div className='profile-page'>
                <div className="profile-page__image">
                    <img src={user?.image} alt="user image" />
                </div>
                <div className="profile-page__info">
                    <h3 className='profile-page__name'>{user?.firstName} {user?.lastName}</h3>
                    <div className='profile-page__gender'>{user?.gender}</div>
                    <div className='profile-page__email'>{user?.email}</div>
                </div>
            </div>
        </div>
    );
}