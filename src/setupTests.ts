import '@testing-library/jest-dom/vitest';

import { server } from '@/shared/utils';


beforeAll(() => {
    server.listen();
});


afterEach(() => {
    server.resetHandlers();
});


afterAll(() => {
    server.close();
});