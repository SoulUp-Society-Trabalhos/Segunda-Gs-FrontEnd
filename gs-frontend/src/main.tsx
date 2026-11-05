import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import './globals.css'

import App from './App.tsx'
import Contatos from './routes/Contatos/index.tsx'
import Faq from './routes/Faq/index.tsx'
import Home from './routes/Home/index.tsx'
import Integrantes from './routes/Integrantes/index.tsx'
import Sobre from './routes/Sobre/index.tsx'
import ErrorPage from './routes/ErrorPage/index.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "contatos",
        element: <Contatos />,
      },
      {
        path: "faq",
        element: <Faq />,
      },
      {
        path: "integrantes",
        element: <Integrantes />,
      },
      {
        path: "sobre",
        element: <Sobre />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);