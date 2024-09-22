import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
    name: "loaders",
    initialState: {
        loading: false
    },
    reducers: {
        showLoading: (state) => {
            state.loading = true; // mutable state updates -> immer.js makes it immutable
        },
        hideLoading: (state) => {
            state.loading = false;
        }
    }
})

export const { showLoading, hideLoading } = loaderSlice.actions;
export default loaderSlice.reducer;