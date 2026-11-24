import React from "react";
import { createRoot } from 'react-dom/client';
import './styles.css'; // Correct CSS import
import App from './App'; // Assuming App is a component

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<App />); // Correct JSX syntax