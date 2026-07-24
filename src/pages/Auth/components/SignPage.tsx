import { AuthForm } from '../AuthForm';

export const SignPage = () => {

    const handleRegister = () => {
        console.log("Registered")
    }

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
            initialValues={{
                username: 'emilys',
                password: 'emilyspass',
            }}
            transferText='Already have an account?'
            transferLinkText='Log In'
            transferLinkPath='/account/login'
            onSubmit={handleRegister}
        />
    );
};