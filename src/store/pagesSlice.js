import {
	createSlice,
	createSelector,
	createAsyncThunk,
} from "@reduxjs/toolkit";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const fetchPages = createAsyncThunk("pages/fetchPages", async () => {
	const response = await fetch(`${SERVER_URL}/api/pages`);
	return response.json();
});

const pagesData = await (async () => {
	const response = await fetch(`${SERVER_URL}/api/pages`);
	return response.json();
})();

const initialState = {
	pages: pagesData,
	activePage: null,
};

export const pagesSlice = createSlice({
	name: "pages",
	initialState,
	reducers: {
		/**
		 * Define a página ativa pelo ID
		 * @param {string} action.payload - ID da página para ativar
		 */
		setActivePage: (state, action) => {
			// Se a página já estiver ativa, desativa
			if (state.activePage === action.payload) {
				state.activePage = null;
			} else {
				state.activePage = action.payload;
			}
		},

		/**
		 * Limpa a seleção de página ativa
		 */
		clearActivePage: (state) => {
			state.activePage = null;
		},

		/**
		 * Adiciona uma nova página ao sistema
		 * @param {Object} action.payload - Objeto de página a ser adicionado
		 */
		addPage: (state, action) => {
			state.pages.push(action.payload);
		},

		/**
		 * Remove uma página pelo ID
		 * @param {string} action.payload - ID da página a ser removida
		 */
		removePage: (state, action) => {
			state.pages = state.pages.filter(
				(page) => page.id !== action.payload
			);
			if (state.activePage === action.payload) {
				state.activePage = null;
			}
		},

		/**
		 * Atualiza propriedades de uma página existente
		 * @param {Object} action.payload - Objeto com id e propriedades a atualizar
		 */
		updatePage: (state, action) => {
			const { id, ...updates } = action.payload;
			const page = state.pages.find((p) => p.id === id);
			if (page) {
				Object.assign(page, updates);
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPages.fulfilled, (state, action) => {
			state.pages = action.payload;
		});
	},
});

export const {
	setActivePage,
	clearActivePage,
	addPage,
	removePage,
	updatePage,
} = pagesSlice.actions;

// Seletores base
const selectPagesState = (state) => state.pages;
const selectPagesArray = (state) => state.pages.pages;
const selectActivePageId = (state) => state.pages.activePage;

// Seletores memoizados
export const selectAllPages = createSelector(
	[selectPagesArray],
	(pages) => pages
);

export const selectActivePage = createSelector(
	[selectPagesArray, selectActivePageId],
	(pages, activePageId) => {
		if (!activePageId) return null;
		return pages.find((page) => page.id === activePageId);
	}
);

export const selectOrderedPages = createSelector([selectPagesArray], (pages) =>
	[...pages].sort((a, b) => a.order - b.order)
);

export const selectIsPageActive = createSelector(
	[selectActivePageId, (_, pageId) => pageId],
	(activePageId, pageId) => activePageId === pageId
);

// Novo seletor para obter um mapa de todos os estados ativos das páginas
export const selectActivePageStates = createSelector(
	[selectOrderedPages, selectActivePageId],
	(pages, activePageId) => {
		return pages.reduce((acc, page) => {
			acc[page.id] = page.id === activePageId;
			return acc;
		}, {});
	}
);

export const selectPagesCount = createSelector(
	[selectPagesState],
	(pagesState) => pagesState.pages.length
);

export default pagesSlice.reducer;
