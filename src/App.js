import './App.css';
import React from 'react';
import {AuthProvider} from "./components/AuthProvider/AuthProvider";
import GlobalPlan from './components/GlobalPlan/GlobalPlan';
import EmployeeGrid from './components/Employee/EmployeeGrid/EmployeeGrid';
import CompanyGrid from './components/Company/CompaniesGrid/CompaniesGrid';
import CompanyForm from './components/Company/CompanyForm/CompanyForm';
import EmployeeForm from './components/Employee/EmployeeForm/EmployeeForm'
import EmployeeList from './components/Employee/EmployeeList/EmployeeList';
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
                <Route path="/companies/form/:id" element={<CompanyForm />} />
                <Route path='/employees/form/:id' element={<EmployeeForm />} />
                <Route path='/employees/list' element={<EmployeeList />} />
            </Routes>
          </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App
