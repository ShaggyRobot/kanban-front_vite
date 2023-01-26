import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Layout } from './Layout';
import { ProtectedRoute } from './ProtectedRoute';

import {
  BoardPage,
  BoardsPage,
  HomePage,
  SignUpPage,
  SignInPage,
  Index,
  EditProfilePage,
} from '@Pages';

import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { pathname } = useLocation();

  return (
    <div className={pathname === '/home' ? 'app-home' : 'app'}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/editprofile" element={<ProtectedRoute outlet={<EditProfilePage />} />} />
          <Route path="/boards" element={<ProtectedRoute outlet={<BoardsPage />} />} />
          <Route path="/boards/:id" element={<ProtectedRoute outlet={<BoardPage />} />} />
        </Route>
      </Routes>
      <ToastContainer autoClose={3000} pauseOnHover />
    </div>
  );
}

export { App };
