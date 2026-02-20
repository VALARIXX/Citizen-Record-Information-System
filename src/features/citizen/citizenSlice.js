import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchCitizenProfile = createAsyncThunk(
    'citizen/fetchProfile',
    async (identifier, { rejectWithValue }) => {
        try {
            const url = identifier.includes('-') ? `/api/citizens/${identifier}` : `/api/citizens/aadhar/${identifier}`;
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateCitizenProfile = createAsyncThunk(
    'citizen/updateProfile',
    async ({ identifier, data }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/api/citizens/${identifier}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const enrollCitizen = createAsyncThunk(
    'citizen/enroll',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/citizens/enroll', data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchHouseholdMembers = createAsyncThunk(
    'citizen/fetchHouseholdMembers',
    async (householdId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/citizens/household/${householdId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const citizenSlice = createSlice({
    name: 'citizen',
    initialState: {
        profile: null,
        householdMembers: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearCitizenError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Profile
            .addCase(fetchCitizenProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCitizenProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchCitizenProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Profile
            .addCase(updateCitizenProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
            })
            // Enroll
            .addCase(enrollCitizen.fulfilled, (state, action) => {
                state.profile = action.payload;
            })
            // Household Members
            .addCase(fetchHouseholdMembers.fulfilled, (state, action) => {
                state.householdMembers = action.payload;
            });
    },
});

export const { clearCitizenError } = citizenSlice.actions;
export default citizenSlice.reducer;
