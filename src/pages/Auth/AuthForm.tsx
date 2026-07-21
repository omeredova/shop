import './AuthForm.css';
import LogoIcon from '@/shared/assets/icons/logo.svg';
import { Button } from '@/shared/ui';
import { Link } from 'react-router-dom';
import type { AuthFormProps } from '../Auth/types/auth.types';

export const AuthForm = ({
    title,
    subtitle,
    buttonText,
    fields,
    transferText,
    transferLinkText,
    transferLinkPath
}: AuthFormProps) => {

    return (
        <div className='auth'>
            <form className='auth__form'>
                <div className='auth__header'>
                    <LogoIcon />
                </div>

                <div className='auth__rules'>
                    <h3 className='auth__rules-header'>
                        {title}
                    </h3>

                    <div className='auth__rules-subheader'>
                        {subtitle}
                    </div>
                </div>

                <div className='auth__fields'>
                    {fields.map(field => (
                        <div key={field.id} className='auth__field'>
                            <label htmlFor={field.id}>
                                {field.label}
                            </label>

                            <input
                                id={field.id}
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                className='form__input'
                            />
                        </div>
                    ))}
                </div>

                <Button className='button auth__button'>
                    {buttonText}
                </Button>
            </form>

            <div className='auth__transfer'>
                <h3>
                    {transferText}{' '}
                    <Link 
                        to={transferLinkPath}
                        className='auth__transfer-link'
                    >
                        {transferLinkText}
                    </Link>
                </h3>
            </div>
        </div>
    );
};