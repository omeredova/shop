import { describe, expect, it } from 'vitest';
import { validateRegistration } from './registration';

const validRegistration = {
    username: 'new-user',
    email: 'user@example.com',
    password: 'secret123',
    confirmPassword: 'secret123',
};

describe('validateRegistration', () => {
    it('accepts valid registration data', () => {
        expect(validateRegistration(validRegistration)).toBeNull();
    });

    it('rejects empty fields', () => {
        expect(validateRegistration({
            ...validRegistration,
            email: '',
        })).toBe('Please fill in all fields.');
    });

    it('rejects an invalid email', () => {
        expect(validateRegistration({
            ...validRegistration,
            email: 'invalid-email',
        })).toBe('Please enter a valid email address.');
    });

    it('rejects a short password', () => {
        expect(validateRegistration({
            ...validRegistration,
            password: '123',
            confirmPassword: '123',
        })).toBe('Password must contain at least 6 characters.');
    });

    it('rejects different passwords', () => {
        expect(validateRegistration({
            ...validRegistration,
            confirmPassword: 'another-password',
        })).toBe('Passwords do not match.');
    });
});