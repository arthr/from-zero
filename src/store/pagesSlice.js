import {
	createSlice,
	createSelector,
	createAsyncThunk,
} from "@reduxjs/toolkit";
import { apiService } from "../services/apiService";

// Thunk para buscar páginas da API
export const fetchPages = createAsyncThunk(
	"pages/fetchPages",
	async (_, { rejectWithValue }) => {
		try {
			return await apiService.get("/api/pages");
		} catch (error) {
			return rejectWithValue(`Error fetching pages: ${error.message}`);
		}
	}
);

// Estado inicial vazio
const initialState = {
	pages: [], // Array vazio para representar o estado inicial
	activePage: null, // Nenhuma página ativa inicialmente
	error: null, // Para armazenar mensagens de erro, se necessário
	loading: false, // Para indicar o estado de carregamento
};

export const pagesSlice = createSlice({
	name: "pages",
	initialState,
	reducers: {
		setActivePage: (state, action) => {
			if (state.activePage === action.payload) {
				state.activePage = null;
			} else {
				state.activePage = action.payload;
			}
		},
		clearActivePage: (state) => {
			state.activePage = null;
		},
		addPage: (state, action) => {
			state.pages.push(action.payload);
		},
		removePage: (state, action) => {
			state.pages = state.pages.filter(
				(page) => page.id !== action.payload
			);
			if (state.activePage === action.payload) {
				state.activePage = null;
			}
		},
		updatePage: (state, action) => {
			const { id, ...updates } = action.payload;
			const page = state.pages.find((p) => p.id === id);
			if (page) {
				Object.assign(page, updates);
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPages.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchPages.fulfilled, (state, action) => {
				state.pages = action.payload;
				state.loading = false;
			})
			.addCase(fetchPages.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Erro ao buscar páginas.";
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
