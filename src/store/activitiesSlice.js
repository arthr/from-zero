import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../services/apiService";

export const fetchActivities = createAsyncThunk(
	"activities/fetchActivities",
	async (_, { rejectWithValue }) => {
		try {
			return await apiService.get("/api/activities");
		} catch (error) {
			return rejectWithValue(
				`Error fetching activities: ${error.message}`
			);
		}
	}
);

const initialState = {
	data: [],
	error: null,
	loading: false,
};

export const activitiesSlice = createSlice({
	name: "activities",
	initialState,
	reducers: {
		/**
		 * Adiciona uma nova atividade ao feed
		 * @param {Object} action.payload - Objeto contendo os dados da atividade
		 */
		addActivity: (state, action) => {
			state.data.push(action.payload);
		},

		/**
		 * Remove uma atividade específica pelo ID
		 * @param {number} action.payload - ID da atividade a ser removida
		 */
		removeActivity: (state, action) => {
			const activityIndex = state.data.findIndex(
				(activity) => activity.id === action.payload
			);
			if (activityIndex !== -1) {
				state.data.splice(activityIndex, 1);
			}
		},

		/**
		 * Atualiza os detalhes de uma atividade existente
		 * @param {Object} action.payload - Objeto com id e dados atualizados
		 * @param {number} action.payload.id - ID da atividade
		 */
		updateActivity: (state, action) => {
			const { id, ...updates } = action.payload;
			const activity = state.data.find((activity) => activity.id === id);
			if (activity) {
				Object.assign(activity, updates);
			}
		},

		/**
		 * Limpa todas as atividades do feed
		 */
		clearActivities: () => {
			return [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchActivities.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchActivities.fulfilled, (state, action) => {
				return action.payload;
			})
			.addCase(fetchActivities.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Error fetching activities.";
			});
	},
});

export const { addActivity, removeActivity, updateActivity, clearActivities } =
	activitiesSlice.actions;

export default activitiesSlice.reducer;
