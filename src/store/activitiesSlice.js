import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../services/apiService";

export const fetchActivities = createAsyncThunk(
	"activities/fetchActivities",
	async () => {
		return apiService.get("/api/activities");
	}
);

const initialState = await apiService.get("/api/activities");

export const activitiesSlice = createSlice({
	name: "activities",
	initialState,
	reducers: {
		/**
		 * Adiciona uma nova atividade ao feed
		 * @param {Object} action.payload - Objeto contendo os dados da atividade
		 */
		addActivity: (state, action) => {
			state.push(action.payload);
		},

		/**
		 * Remove uma atividade específica pelo ID
		 * @param {number} action.payload - ID da atividade a ser removida
		 */
		removeActivity: (state, action) => {
			const activityIndex = state.findIndex(
				(activity) => activity.id === action.payload
			);
			if (activityIndex !== -1) {
				state.splice(activityIndex, 1);
			}
		},

		/**
		 * Atualiza os detalhes de uma atividade existente
		 * @param {Object} action.payload - Objeto com id e dados atualizados
		 * @param {number} action.payload.id - ID da atividade
		 */
		updateActivity: (state, action) => {
			const { id, ...updates } = action.payload;
			const activity = state.find((activity) => activity.id === id);
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
		builder.addCase(fetchActivities.fulfilled, (state, action) => {
			return action.payload;
		});
	},
});

export const { addActivity, removeActivity, updateActivity, clearActivities } =
	activitiesSlice.actions;

export default activitiesSlice.reducer;
