import { describe, expect, test } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { server } from '@/shared/utils/server';

import { LoginPage } from '@/pages/Auth/components/LoginPage';
import { renderWithProviders } from '@/shared/utils/test-utils';


describe('LoginPage integration', () => {

    test('should save user credentials after successful login', async () => {

        const user = userEvent.setup();

        const { store } = renderWithProviders(<LoginPage />);

        const usernameInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');

        await user.clear(usernameInput);
        await user.type(usernameInput, 'emilys');
        await user.clear(passwordInput);
        await user.type(passwordInput, 'emilyspass');

        await user.click(
            screen.getByRole('button', {
                name: 'Log In'
            })
        );

        await waitFor(() => {
            expect(store.getState().auth.user).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    username: expect.any(String),
                    accessToken: expect.any(String),
                })
            );
        });

    });

    test('should not save user credentials after failed login', async () => {

        server.use(
            http.post(
                'https://dummyjson.com/auth/login',
                () => {
                    return HttpResponse.json(
                        {
                            message: 'Invalid credentials',
                        },
                        {
                            status: 401,
                        }
                    );
                }
            )
        );

        const user = userEvent.setup();
        const { store } = renderWithProviders( <LoginPage />);

        await user.clear(
            screen.getByLabelText('Username')
        );

        await user.type(
            screen.getByLabelText('Username'),
            'wrong'
        );

        await user.clear(
            screen.getByLabelText('Password')
        );

        await user.type(
            screen.getByLabelText('Password'),
            'wrong'
        );

        await user.click(
            screen.getByRole('button', {
                name: 'Log In'
            })
        );

        await waitFor(() => {

            expect(
                store.getState().auth.user
            ).toBeNull();

        });
    });

});