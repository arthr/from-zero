import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	pieces: [],
	currentPlayer: 1,
	turn: 1,
	/**
	 * dev: 'Modo de Desenvolvimento',
	 * setup: 'Configurando o Jogo',
	 * waiting: 'Aguardando para Começar',
	 * play: 'Jogo em Progresso',
	 * end: 'Fim de Jogo',
	 */
	gamePhase: "dev",
	selectedPiece: null,
	winner: null,
};

const gameSlice = createSlice({
	name: "game",
	initialState,
	reducers: {
		// Selecionar uma peça
		selectPiece: (state, action) => {
			state.selectedPiece = action.payload;
		},

		// Mover uma peça para nova posição
		movePiece: (state, action) => {
			const { pieceId, newPosition } = action.payload;
			const pieceIndex = state.pieces.findIndex(
				(piece) => piece.id === pieceId
			);

			if (pieceIndex !== -1) {
				state.pieces[pieceIndex].position = newPosition;
			}
		},

		// Avançar para o próximo turno
		nextTurn: (state) => {
			state.turn += 1;
			state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;
			state.selectedPiece = null;
		},

		// Mudar a fase do jogo
		setGamePhase: (state, action) => {
			state.gamePhase = action.payload;
		},

		// Resetar o jogo para o estado inicial
		resetGame: () => {
			return initialState;
		},

		// Definir um vencedor
		setWinner: (state, action) => {
			state.winner = action.payload;
			state.gamePhase = "end";
		},

		// Adicionar peças ao tabuleiro
		setPieces: (state, action) => {
			state.pieces = action.payload;
		},
	},
});

// Exportar as actions
export const {
	selectPiece,
	movePiece,
	nextTurn,
	setGamePhase,
	resetGame,
	setWinner,
	setPieces,
} = gameSlice.actions;

// Selectors
export const selectGameState = (state) => state.game;
export const selectCurrentPlayer = (state) => state.game.currentPlayer;
export const selectPieces = (state) => state.game.pieces;
export const selectSelectedPiece = (state) => state.game.selectedPiece;
export const selectGamePhase = (state) => state.game.gamePhase;
export const selectTurn = (state) => state.game.turn;
export const selectWinner = (state) => state.game.winner;

export default gameSlice.reducer;
