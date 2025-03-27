import { createSlice } from "@reduxjs/toolkit";

// Carrega o estado inicial do localStorage
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
		toggleCardCollapse: (state, action) => {
			const cardId = action.payload;
			state.collapsedCards[cardId] = !state.collapsedCards[cardId];

			// Salva no localStorage
			try {
				localStorage.setItem(
					"collapsedCards",
					JSON.stringify(state.collapsedCards)
				);
			} catch (err) {
				console.error("Erro ao salvar estado de cards:", err);
			}
		},

		resetCardStates: (state) => {
			state.collapsedCards = {};
			localStorage.removeItem("collapsedCards");
		},
	},
});

export const { toggleCardCollapse, resetCardStates } = uiSlice.actions;

// Selector para verificar se um card está colapsado
export const selectCardCollapsed = (state, cardId) =>
	state.ui.collapsedCards[cardId] || false;

export default uiSlice.reducer;
