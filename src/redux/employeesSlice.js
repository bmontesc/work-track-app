import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const employeesSlice = createSlice ({
    name: "employees",
    initialState,
    reducers:{
        setEmployeesList: (state, action) => {
            state.push(...action.payload)
        }
    },
});

export const { setEmployeesList } = employeesSlice.actions;
export default employeesSlice.reducer;