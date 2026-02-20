import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import citizenReducer from '../features/citizen/citizenSlice';
import certificateReducer from '../features/citizen/certificateSlice';
import userReducer from '../features/admin/userSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        citizen: citizenReducer,
        certificate: certificateReducer,
        user: userReducer,
    },
});
