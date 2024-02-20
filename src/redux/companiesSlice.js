import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const companiesSlice = createSlice ({
    name: "companies",
    initialState,
    reducers:{
        setCompaniesList: (state, action) => {
            state.push(...action.payload)
        }
    },
});

export const { setCompaniesList } = companiesSlice.actions;
export default companiesSlice.reducer;