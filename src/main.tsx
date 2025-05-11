
import "regenerator-runtime/runtime";
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from "@/components/ui/sonner";
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Toaster position="bottom-right" />
  </React.StrictMode>
);
