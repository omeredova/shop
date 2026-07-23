import { http, HttpResponse } from 'msw';


export const handlers = [
    http.post(
        'https://dummyjson.com/auth/login',
        () => {

            return HttpResponse.json({
                id: 1,
                username: 'test-user',
                email: 'test@test.com',
                firstName: 'Test',
                lastName: 'User',
                image: 'image.png',
                accessToken: 'test-token',
            });
        }
    ),
];