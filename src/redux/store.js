import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './employeesSlice';
import companiesReducer from './companiesSlice';


export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    companies: companiesReducer,
  },   
});