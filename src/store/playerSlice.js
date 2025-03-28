import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../services/apiService";
import { socketService } from "../services/socketService";
import { store } from "./index";

export const fetchPlayer = createAsyncThunk(
	"player/fetchPlayer",
	async (_, { rejectWithValue }) => {
		try {
			return await apiService.get("/api/player");
		} catch (error) {
			return rejectWithValue(`Error fetching player: ${error.message}`);
		}
	}
);

export const updatePlayer = createAsyncThunk(
	"player/updatePlayer",
	async (player) => {
		return apiService.put("/api/player", player);
	}
);

const initialState = {
	id: 1,
	name: "",
	level: 1,
	health: 0,
	energy: 0,
	xp: 0,
	stats: {
		strength: 5,
		agility: 5,
		intelligence: 5,
		luck: 5,
	},
	maxSlots: 16,
	enabledSlots: 4,
	inventory: [],
	error: null,
	loading: false,
};

export const playerSlice = createSlice({
	name: "player",
	initialState,
	reducers: {
		/**
		 * Define o nome do jogador
		 * @param {string} action.payload - O novo nome do jogador
		 */
		setName: (state, action) => {
			state.name = action.payload;
		},
		/**
		 * Aumenta o nível do jogador em 1 ponto
		 */
		levelUp: (state) => {
			state.level += 1;
		},
		/**
		 * Atualiza o valor de saúde do jogador
		 * @param {number} action.payload - O novo valor de saúde
		 */
		updateHealth: (state, action) => {
			state.health = action.payload;
		},
		/**
		 * Atualiza o valor de energia do jogador
		 * @param {number} action.payload - O novo valor de energia
		 */
		updateEnergy: (state, action) => {
			state.energy = action.payload;
		},
		/**
		 * Atualiza os pontos de experiência do jogador
		 * @param {number} action.payload - O novo valor de XP
		 */
		updateXp: (state, action) => {
			state.xp = action.payload;
		},
		/**
		 * Atualiza as estatísticas do jogador
		 * @param {Object} action.payload - Objeto contendo estatísticas a serem atualizadas
		 */
		updateStats: (state, action) => {
			state.stats = { ...state.stats, ...action.payload };
		},
		/**
		 * Define o número máximo de slots de inventário disponíveis
		 * @param {number} action.payload - Número máximo de slots
		 */
		updateMaxSlots: (state, action) => {
			state.maxSlots = action.payload;
		},
		/**
		 * Define o número de slots atualmente habilitados para o jogador
		 * @param {number} action.payload - Número de slots habilitados
		 */
		updateEnabledSlots: (state, action) => {
			state.enabledSlots = action.payload;
		},
		/**
		 * Adiciona um item ao inventário do jogador
		 * Se o item já existir, aumenta a quantidade
		 * @param {Object} action.payload - Item a ser adicionado com id e quantidade
		 */
		addItemToInventory: (state, action) => {
			const existingItem = state.inventory.find(
				(item) => item.id === action.payload.id
			);
			if (existingItem) {
				existingItem.quantity += action.payload.quantity;
			} else {
				state.inventory.push(action.payload);
			}
		},
		/**
		 * Remove um item do inventário do jogador
		 * Se a quantidade a ser removida for menor que a existente, apenas reduz a quantidade
		 * @param {Object} action.payload - Item a ser removido com id e quantidade
		 */
		removeItemFromInventory: (state, action) => {
			const itemIndex = state.inventory.findIndex(
				(item) => item.id === action.payload.id
			);
			if (itemIndex !== -1) {
				const item = state.inventory[itemIndex];
				if (item.quantity > action.payload.quantity) {
					item.quantity -= action.payload.quantity;
				} else {
					state.inventory.splice(itemIndex, 1);
				}
			}
		},
		/**
		 * Atualiza as propriedades de um item específico no inventário
		 * @param {Object} action.payload - Objeto com id do item e propriedades a serem atualizadas
		 */
		updateInventoryItem: (state, action) => {
			const itemIndex = state.inventory.findIndex(
				(item) => item.id === action.payload.id
			);
			if (itemIndex !== -1) {
				state.inventory[itemIndex] = {
					...state.inventory[itemIndex],
					...action.payload,
				};
			}
		},
		/**
		 * Limpa completamente o inventário do jogador, removendo todos os itens
		 */
		clearInventory: (state) => {
			state.inventory = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPlayer.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchPlayer.fulfilled, (state, action) => {
				return { ...state, ...action.payload };
			})
			.addCase(fetchPlayer.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Erro ao buscar jogador.";
			})
			.addCase(updatePlayer.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updatePlayer.fulfilled, (state, action) => {
				return { ...state, ...action.payload };
			})
			.addCase(updatePlayer.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Erro ao atualizar jogador.";
			});
	},
});

// Escute eventos do servidor via socket
socketService.connect().on("playerUpdate", (updatedPlayer) => {
	store.dispatch(updatePlayer.fulfilled(updatedPlayer));
});

export const {
	updateHealth,
	updateEnergy,
	updateXp,
	levelUp,
	setName,
	updateStats,
	updateMaxSlots,
	updateEnabledSlots,
	addItemToInventory,
	removeItemFromInventory,
	updateInventoryItem,
	clearInventory,
} = playerSlice.actions;

export default playerSlice.reducer;
