import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BooksProvider } from './store/useBooks.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BooksProvider>
    <App />
    </BooksProvider>
  </StrictMode>,
)
