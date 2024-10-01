import { createSlice } from '@reduxjs/toolkit';

const lectureSlice = createSlice({
    name: 'lecturers',
    initialState: {
        lecturers: [],
        showForm: false,
        updateLecturer: null,
        searchValue: [],
        inputValue: '',
        loading: false,
        error: null,
    },
    reducers: {
        setLecturers: (state, action) => {
            state.lecturers = action.payload;
        },
        setShowForm: (state, action) => {
            state.showForm = action.payload;
        },
        setUpdateLecturer: (state, action) => {
            state.updateLecturer = action.payload;
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
        setInputValue: (state, action) => {
            state.inputValue = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

console.log(lectureSlice.actions);

export const {
    setLecturers,
    setShowForm,
    setUpdateLecturer,
    setSearchValue,
    setInputValue,
    setLoading,
    setError,
} = lectureSlice.actions;
export default lectureSlice.reducer;
