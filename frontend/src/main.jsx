import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import Router from './Router.jsx'
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AuthProvider } from './hooks/AuthContext.jsx'

axios.defaults.baseURL = "https://nko-seven.vercel.app";
axios.defaults.withCredentials = true;

AOS.init({ duration: 1000 });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={Router} />
      <Toaster toastOptions={{ duration: 4000 }} />
    </AuthProvider>

  </StrictMode>

)
