import { createSlice } from "@reduxjs/toolkit";
import { apiService } from "../services/apiService";
import { socketService } from "../services/socketService";
import { store } from "./index";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const initialState = await apiService.get("/api/messages");

export const messagesSlice = createSlice({
	name: "messages",
	initialState,
	reducers: {
		/**
		 * Adiciona uma nova mensagem ao chat
		 * @param {Object} action.payload - Objeto contendo os dados da mensagem
		 */
		addMessage: (state, action) => {
			state.push(action.payload);
		},

		/**
		 * Remove uma mensagem específica pelo ID
		 * @param {number} action.payload - ID da mensagem a ser removida
		 */
		removeMessage: (state, action) => {
			const messageIndex = state.findIndex(
				(message) => message.id === action.payload
			);
			if (messageIndex !== -1) {
				state.splice(messageIndex, 1);
			}
		},

		/**
		 * Edita o conteúdo de uma mensagem existente
		 * @param {Object} action.payload - Objeto com id e texto atualizado
		 * @param {number} action.payload.id - ID da mensagem
		 * @param {string} action.payload.text - Novo texto da mensagem
		 */
		editMessage: (state, action) => {
			const { id, text } = action.payload;
			const message = state.find((message) => message.id === id);
			if (message) {
				message.text = text;
			}
		},

		/**
		 * Limpa todas as mensagens do chat
		 */
		clearMessages: () => {
			return [];
		},
	},
});

// Escute eventos do servidor via socket
socketService.connect().on("newMessage", (message) => {
	store.dispatch(messagesSlice.actions.addMessage(message));
});

export const { addMessage, removeMessage, editMessage, clearMessages } =
	messagesSlice.actions;

/**
 * Envia uma nova mensagem para o servidor via socket
 * @param {Object} message - Objeto contendo os dados da mensagem
 */
export const sendMessage = (message) => () => {
	socketService.emit("sendMessage", message);
};

export default messagesSlice.reducer;
