import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './slices/eventSlice';
import lecturerReducer from './slices/lecturerSlice';
const store = configureStore({
    reducer: {
        events: eventReducer,
        lecturers: lecturerReducer,

        // thêm reducer khác tại đây nếu cần
    },
});
console.log(store);
export default store;
