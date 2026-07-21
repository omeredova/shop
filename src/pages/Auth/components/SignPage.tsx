import { AuthForm } from '@/pages';

export const SignPage = () => {

    return (
        <AuthForm
            title='Sign up'
            subtitle="Don't have an account? Create your account, it takes less than a minute"
            buttonText='Sign Up'
            fields={[
                {
                    id: 'name',
                    type: 'text',
                    name: 'name',
                    placeholder: 'Enter your name',
                    label: 'Full name',
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
        />
    );
};