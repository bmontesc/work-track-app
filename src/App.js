import './App.css';
import React from 'react';
import {AuthProvider} from "./components/AuthProvider/AuthProvider.js";
import GlobalPlan from './components/GlobalPlan/GlobalPlan.js';
import EmployeeGrid from './components/Employee/EmployeeGrid/EmployeeGrid.js';
import CompanyGrid from './components/Company/CompaniesGrid/CompaniesGrid.js';
import CompanyForm from './components/Company/CompanyForm/CompanyForm.js';
import EmployeeForm from './components/Employee/EmployeeForm/EmployeeForm.js'
import EmployeeList from './components/Employee/EmployeeList/EmployeeList.js';
import CompanyList from './components/Company/CompanyList/CompanyList.js';
import LogIn from './components/LogInPage/LogIn.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Dashboard} from './components/Dashboard/Dashboard.js';

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
                <Route path='/companies/list' element={<CompanyList />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App
