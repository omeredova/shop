import { createRoot } from 'react-dom/client';

const App = () => {
  return <h1>React Shop</h1>;
};

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(<App />);
}