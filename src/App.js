import './App.css';
import Worksheet from './components/worksheet/worksheet';
import AppHeader from './components/Header/Header';
import EmployeeGrid from './components/EmployeeGrid/EmployeeGrid';
import CompanyGrid from './components/CompaniesGrid/CompaniesGrid';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <ConfigProvider
        theme={
          {
            "token": {
              "colorPrimary": "#00529b",
              "colorInfo": "#00529b",
              "colorSuccess": "#a5e587",
              "colorWarning": "#ffd37d",
              "colorError": "#f99596",
              "sizeStep": 4,
              "sizeUnit": 5,
              "borderRadius": 10,
              "fontSize": 12,
            }
          }
        }
      >
        <BrowserRouter>
          <AppHeader />
          <Routes>
            <Route path="/" element={<Worksheet />} />
            <Route path="/companies" element={<CompanyGrid />} />
            <Route path="/employees" element={<EmployeeGrid />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;
