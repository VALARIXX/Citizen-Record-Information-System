import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchCitizenRequests = createAsyncThunk(
    'certificate/fetchRequests',
    async (citizenId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/certificates/citizen/${citizenId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createCertificateRequest = createAsyncThunk(
    'certificate/createRequest',
    async (requestData, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/certificates/request', requestData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const certificateSlice = createSlice({
    name: 'certificate',
    initialState: {
        requests: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearCertificateError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCitizenRequests.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCitizenRequests.fulfilled, (state, action) => {
                state.loading = false;
                state.requests = action.payload;
            })
            .addCase(fetchCitizenRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createCertificateRequest.fulfilled, (state, action) => {
                state.requests.unshift(action.payload);
            });
    },
});

export const { clearCertificateError } = certificateSlice.actions;
export default certificateSlice.reducer;
