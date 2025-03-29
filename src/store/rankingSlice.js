import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../services/apiService";

export const fetchRanking = createAsyncThunk(
	"ranking/fetchRanking",
	async (_, { rejectWithValue }) => {
		try {
			return apiService.get("/api/ranking");
		} catch (error) {
			return rejectWithValue(`Error fetching ranking: ${error.message}`);
		}
	}
);

const initialState = {
	data: [],
	error: null,
	loading: false,
};

export const rankingSlice = createSlice({
	name: "ranking",
	initialState,
	reducers: {
		/**
		 * Atualiza a pontuação de um jogador específico no ranking
		 * @param {Object} action.payload - Objeto contendo id do jogador e nova pontuação
		 * @param {number} action.payload.id - ID do jogador a ser atualizado
		 * @param {number} action.payload.score - Nova pontuação do jogador
		 */
		updateScore: (state, action) => {
			const { id, score } = action.payload;
			const player = state.data.find((p) => p.id === id);
			if (player) {
				player.score = score;
			}
		},

		/**
		 * Adiciona um novo jogador ao ranking
		 * @param {Object} action.payload - Objeto contendo dados do novo jogador
		 */
		addPlayer: (state, action) => {
			state.data.push(action.payload);
		},

		/**
		 * Remove um jogador do ranking pelo seu ID
		 * @param {number} action.payload - ID do jogador a ser removido
		 */
		removePlayer: (state, action) => {
			const playerIndex = state.data.findIndex(
				(p) => p.id === action.payload
			);
			if (playerIndex !== -1) {
				state.data.splice(playerIndex, 1);
			}
		},

		/**
		 * Atualiza o nome de um jogador específico
		 * @param {Object} action.payload - Objeto contendo id e novo nome
		 * @param {number} action.payload.id - ID do jogador
		 * @param {string} action.payload.name - Novo nome do jogador
		 */
		updatePlayerName: (state, action) => {
			const { id, name } = action.payload;
			const player = state.data.find((p) => p.id === id);
			if (player) {
				player.name = name;
			}
		},

		/**
		 * Atualiza o avatar de um jogador específico
		 * @param {Object} action.payload - Objeto contendo id e novo avatar
		 * @param {number} action.payload.id - ID do jogador
		 * @param {string} action.payload.avatar - URL ou referência do avatar
		 */
		updatePlayerAvatar: (state, action) => {
			const { id, avatar } = action.payload;
			const player = state.data.find((p) => p.id === id);
			if (player) {
				player.avatar = avatar;
			}
		},

		/**
		 * Define qual jogador é o usuário atual
		 * @param {number} action.payload - ID do jogador que é o usuário atual
		 */
		setCurrentUser: (state, action) => {
			state.data.forEach((player) => {
				player.isCurrentUser = player.id === action.payload;
			});
		},

		/**
		 * Atualiza múltiplos atributos de um jogador de uma vez
		 * @param {Object} action.payload - Objeto contendo id e atributos a serem atualizados
		 * @param {number} action.payload.id - ID do jogador
		 */
		updatePlayerAttributes: (state, action) => {
			const { id, ...attributes } = action.payload;
			const player = state.data.find((p) => p.id === id);
			if (player) {
				Object.assign(player, attributes);
			}
		},

		/**
		 * Limpa completamente o ranking, removendo todos os jogadores
		 */
		resetRanking: () => {
			return [];
		},

		/**
		 * Obtém os N melhores jogadores ordenados por pontuação
		 * Este é um reducer especial que não modifica o estado, apenas o lê
		 * @param {number} action.payload - Número de jogadores a serem retornados
		 */
		getTopPlayers: {
			reducer: (state) => state.data,
			prepare: (count = 10) => ({ payload: count }),
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRanking.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchRanking.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
				Object.assign(state, action.payload);
			})
			.addCase(fetchRanking.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Error fetching ranking.";
			});
	},
});

export const {
	updateScore,
	addPlayer,
	removePlayer,
	updatePlayerName,
	updatePlayerAvatar,
	setCurrentUser,
	updatePlayerAttributes,
	resetRanking,
	getTopPlayers,
} = rankingSlice.actions;

export default rankingSlice.reducer;
