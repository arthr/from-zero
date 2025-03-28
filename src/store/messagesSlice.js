import { createSlice } from "@reduxjs/toolkit";
import { messagesData } from "../data/mockMessages";

const initialState = messagesData;

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

export const { addMessage, removeMessage, editMessage, clearMessages } =
	messagesSlice.actions;

export default messagesSlice.reducer;
