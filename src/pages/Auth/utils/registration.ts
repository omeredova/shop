import type { RegistrationRequest } from '../types/auth.types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegistration = (
    values: RegistrationRequest
): string | null => {
    const username = values.username.trim();
    const email = values.email.trim();

    if (!username || !email || !values.password || !values.confirmPassword) {
        return 'Please fill in all fields.';
    }

    if (username.length < 3) {
        return 'Username must contain at least 3 characters.';
    }

    if (!EMAIL_PATTERN.test(email)) {
        return 'Please enter a valid email address.';
    }

    if (values.password.length < 6) {
        return 'Password must contain at least 6 characters.';
    }

    if (values.password !== values.confirmPassword) {
        return 'Passwords do not match.';
    }

    return null;
};

export const simulateRegistration = (
    _values: RegistrationRequest,
    delay = 600
): Promise<void> => new Promise((resolve) => {
    window.setTimeout(resolve, delay);
});
