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
	async (notification) => {
		return apiService.post("/api/notifications", notification);
	}
);

const initialState = [];

export const notificationsSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		/**
		 * Adiciona uma nova notificação
		 * @param {Object} action.payload - Objeto contendo os dados da notificação
		 */
		addNotification: (state, action) => {
			state.push(action.payload);
		},

		/**
		 * Remove uma notificação específica pelo ID
		 * @param {number} action.payload - ID da notificação a ser removida
		 */
		removeNotification: (state, action) => {
			const notificationIndex = state.findIndex(
				(notification) => notification.id === action.payload
			);
			if (notificationIndex !== -1) {
				state.splice(notificationIndex, 1);
			}
		},

		/**
		 * Marca uma notificação como lida
		 * @param {number} action.payload - ID da notificação a ser marcada
		 */
		markAsRead: (state, action) => {
			const notification = state.find(
				(notification) => notification.id === action.payload
			);
			if (notification) {
				notification.read = true;
			}
		},

		/**
		 * Limpa todas as notificações
		 */
		clearNotifications: () => {
			return [];
		},

		/**
		 * Marca todas as notificações como lidas
		 */
		markAllAsRead: (state) => {
			state.forEach((notification) => {
				notification.read = true;
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchNotifications.fulfilled, (state, action) => {
				return action.payload;
			})
			.addCase(createNotification.fulfilled, (state, action) => {
				state.push(action.payload);
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
