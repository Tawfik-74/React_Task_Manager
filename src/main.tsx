import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';

const container = document.getElementById('root');

if (container === null) {
  throw new Error('TaskFlow: could not find the #root element to mount into.');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
