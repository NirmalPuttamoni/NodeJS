import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
    name: "loaders",
    initialState: {
        loading: false,
        isImageLoading: false
    },
    reducers: {
        showLoading: (state) => {
            state.loading = true; // mutable state updates -> immer.js makes it immutable
        },
        hideLoading: (state) => {
            state.loading = false;
        },
        imageLoader: (state, {payload}) => {
            state.isImageLoading = payload;
        }
    }
})

export const { showLoading, hideLoading, imageLoader } = loaderSlice.actions;
export default loaderSlice.reducer;