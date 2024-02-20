import './App.css';
import React from 'react';
import {AuthProvider} from "./components/AuthProvider/AuthProvider";
import GlobalPlan from './components/GlobalPlan/GlobalPlan';
import EmployeeGrid from './components/EmployeeGrid/EmployeeGrid';
import CompanyGrid from './components/CompaniesGrid/CompaniesGrid';
import CompanyForm from './components/CompanyForm/CompanyForm';
import LogIn from './components/LogInPage/LogIn';
import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom';

const isLoggedIn = false

function App() {
  return (
    <>
      <AuthProvider>
          <BrowserRouter>
              <Routes>
                <Route path="/" element={<LogIn />} />
                <Route path="/login" element={<LogIn />} />
                <Route path='/home' element={<GlobalPlan />} />
                <Route path="/companies" element={<CompanyGrid />} />
                <Route path="/employees" element={<EmployeeGrid />} />
                <Route path="/companies/form" element={<CompanyForm />} />
            </Routes>
          </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App
