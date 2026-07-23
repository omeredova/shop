import { setupServer } from 'msw/node';
import { handlers } from '@/shared';


export const server = setupServer(...handlers);
