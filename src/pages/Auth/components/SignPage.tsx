import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../AuthForm';
import type { LoginRequest, RegistrationRequest } from '../types/auth.types';
import { simulateRegistration, validateRegistration } from '../utils/registration';

export const SignPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    const handleRegister = async (values: LoginRequest) => {
        const registration = values as RegistrationRequest;
        const validationError = validateRegistration(registration);

        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        setErrorMessage(undefined);
        setIsLoading(true);

        await simulateRegistration(registration);

        navigate('/account/login', {
            replace: true,
            state: {
                registrationSuccess: true,
            },
        });
    };

    return (
        <AuthForm
            title='Sign up'
            subtitle="Don't have an account? Create your account, it takes less than a minute"
            buttonText='Sign Up'
            fields={[
                {
                    id: 'username',
                    type: 'text',
                    name: 'username',
                    placeholder: 'Enter your username',
                    label: 'Username',
                },
                {
                    id: 'email',
                    type: 'email',
                    name: 'email',
                    placeholder: 'Enter your email',
                    label: 'Email Address',
                },
                {
                    id: 'password',
                    type: 'password',
                    name: 'password',
                    placeholder: 'Enter your password',
                    label: 'Password',
                },
                {
                    id: 'confirmPassword',
                    type: 'password',
                    name: 'confirmPassword',
                    placeholder: 'Repeat your password',
                    label: 'Confirm Password',
                },
            ]}
            transferText='Already have an account?'
            transferLinkText='Log In'
            transferLinkPath='/account/login'
            onSubmit={handleRegister}
            error={Boolean(errorMessage)}
            errorMessage={errorMessage}
            isLoading={isLoading}
        />
    );
};