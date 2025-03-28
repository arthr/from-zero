import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	pieces: [],
	currentPlayer: 1,
	turn: 1,
	gamePhase: "dev", // dev, setup, waiting, play, end
	selectedPiece: null,
	winner: null,
};

const gameSlice = createSlice({
	name: "game",
	initialState,
	reducers: {
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
	},
});

export const { setGamePhase, resetGame, setWinner } = gameSlice.actions;

// Selectors
export const selectGameState = (state) => state.game;
export const selectCurrentPlayer = (state) => state.game.currentPlayer;
export const selectGamePhase = (state) => state.game.gamePhase;
export const selectWinner = (state) => state.game.winner;

export default gameSlice.reducer;
