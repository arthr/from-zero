import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import io from "socket.io-client";
import { store } from "./index";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
const socket = io(SOCKET_URL);

export const fetchNotifications = createAsyncThunk(
	"notifications/fetchNotifications",
	async () => {
		const response = await fetch(`${SERVER_URL}/api/notifications`);
		return response.json();
	}
);

export const createNotification = createAsyncThunk(
	"notifications/createNotification",
	async (notification) => {
		const response = await fetch(`${SERVER_URL}/api/notifications`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(notification),
		});
		return response.json();
	}
);

const initialState = await (async () => {
	const response = await fetch(`${SERVER_URL}/api/notifications`);
	return response.json();
})();

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
socket.on("newNotification", (notification) => {
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
