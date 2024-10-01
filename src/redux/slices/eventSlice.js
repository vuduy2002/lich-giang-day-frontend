import { createSlice } from '@reduxjs/toolkit';

const eventSlice = createSlice({
    name: 'events',
    initialState: {
        eventList: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        fetchEventsStart: (state) => {
            state.isLoading = true;
        },
        fetchEventsSuccess: (state, action) => {
            state.isLoading = false;
            state.eventList = action.payload;
        },
        fetchEventsFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // các reducer khác
    },
});

export const { fetchEventsStart, fetchEventsSuccess, fetchEventsFailure } =
    eventSlice.actions;

export default eventSlice.reducer;
