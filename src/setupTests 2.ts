import '@testing-library/jest-dom/vitest';

import { server } from '@/shared/utils/server';


beforeAll(() => {
    server.listen();
});


afterEach(() => {
    server.resetHandlers();
});


afterAll(() => {
    server.close();
});