import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../services/apiService";
import { socketService } from "../services/socketService";
import { store } from "./index";

export const fetchNotifications = createAsyncThunk(
	"notifications/fetchNotifications",
	async (_, { rejectWithValue }) => {
		try {
			return apiService.get("/api/notifications");
		} catch (error) {
			return rejectWithValue(
				`Error fetching notifications: ${error.message}`
			);
		}
	}
);

export const createNotification = createAsyncThunk(
	"notifications/createNotification",
	async (notification, { rejectWithValue }) => {
		try {
			return apiService.post("/api/notifications", notification);
		} catch (error) {
			return rejectWithValue(
				`Error creating notification: ${error.message}`
			);
		}
	}
);

const initialState = {
	data: [],
	error: null,
	loading: false,
};

export const notificationsSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		/**
		 * Adiciona uma nova notificação
		 * @param {Object} action.payload - Objeto contendo os dados da notificação
		 */
		addNotification: (state, action) => {
			state.data.push(action.payload);
		},

		/**
		 * Remove uma notificação específica pelo ID
		 * @param {number} action.payload - ID da notificação a ser removida
		 */
		removeNotification: (state, action) => {
			const notificationIndex = state.data.findIndex(
				(notification) => notification.id === action.payload
			);
			if (notificationIndex !== -1) {
				state.data.splice(notificationIndex, 1);
			}
		},

		/**
		 * Marca uma notificação como lida
		 * @param {number} action.payload - ID da notificação a ser marcada
		 */
		markAsRead: (state, action) => {
			const notification = state.data.find(
				(notification) => notification.id === action.payload
			);
			if (notification) {
				notification.read = true;
			}
		},

		/**
		 * Limpa todas as notificações
		 */
		clearNotifications: (state) => {
			state.date = [];
		},

		/**
		 * Marca todas as notificações como lidas
		 */
		markAllAsRead: (state) => {
			state.data.forEach((notification) => {
				notification.read = true;
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchNotifications.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchNotifications.fulfilled, (state, action) => {
				state.data = action.payload;
				state.loading = false;
				state.error = null;
				Object.assign(state, action.payload);
			})
			.addCase(fetchNotifications.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(createNotification.pending, (state) => {
				state.loading = true;
			})
			.addCase(createNotification.fulfilled, (state, action) => {
				state.push(action.payload);
			})
			.addCase(createNotification.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

// Escute eventos do servidor via socket
socketService.connect().on("newNotification", (notification) => {
	store.dispatch(notificationsSlice.actions.addNotification(notification));
});

export const {
	addNotification,
	removeNotification,
	markAsRead,
	clearNotifications,
	markAllAsRead,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
