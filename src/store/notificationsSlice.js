import { createSlice } from "@reduxjs/toolkit";
import { notificationsData } from "../data/mockNotifications";

const initialState = notificationsData;

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
});

export const {
	addNotification,
	removeNotification,
	markAsRead,
	clearNotifications,
	markAllAsRead,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
