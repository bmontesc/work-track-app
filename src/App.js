import './App.css';
import Worksheet from './components/worksheet/worksheet';
import AppHeader from './components/Header/Header';
import EmployeeGrid from './components/EmployeeGrid/EmployeeGrid';
import CompanyGrid from './components/CompaniesGrid/CompaniesGrid';
import CompanyForm from './components/CompanyForm/CompanyForm'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
        <BrowserRouter>
          <AppHeader />
          <Routes>
            <Route path="/" element={<Worksheet />} />
            <Route path="/companies" element={<CompanyGrid />} />
            <Route path="/employees" element={<EmployeeGrid />} />
            <Route path="/companies/form" element={<CompanyForm />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App
