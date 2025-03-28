import { createSlice } from "@reduxjs/toolkit";

/**
 * Carrega o estado de colapso dos cards do localStorage
 * @returns {Object} Estado de colapso dos cards ou objeto vazio em caso de erro
 */
const loadCollapsedState = () => {
	try {
		const savedState = localStorage.getItem("collapsedCards");
		if (savedState === null) {
			return {};
		}
		return JSON.parse(savedState);
	} catch (err) {
		console.error("Erro ao carregar estado de cards:", err);
		return {};
	}
};

const initialState = {
	collapsedCards: loadCollapsedState(),
};

export const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		/**
		 * Alterna o estado de colapso de um card específico e salva no localStorage
		 * @param {string} action.payload - ID do card a ter o estado alternado
		 */
		toggleCardCollapse: (state, action) => {
			const cardId = action.payload;
			state.collapsedCards[cardId] = !state.collapsedCards[cardId];

			try {
				localStorage.setItem(
					"collapsedCards",
					JSON.stringify(state.collapsedCards)
				);
			} catch (err) {
				console.error("Erro ao salvar estado de cards:", err);
			}
		},

		/**
		 * Redefine todos os estados de colapso dos cards e limpa o localStorage
		 */
		resetCardStates: (state) => {
			state.collapsedCards = {};
			localStorage.removeItem("collapsedCards");
		},
	},
});

export const { toggleCardCollapse, resetCardStates } = uiSlice.actions;

/**
 * Selector para verificar se um card específico está colapsado
 * @param {Object} state - Estado global da aplicação
 * @param {string} cardId - ID do card a ser verificado
 * @returns {boolean} Verdadeiro se o card estiver colapsado, falso caso contrário
 */
export const selectCardCollapsed = (state, cardId) =>
	state.ui.collapsedCards[cardId] || false;

export default uiSlice.reducer;
