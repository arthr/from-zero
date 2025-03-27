import { createSlice } from "@reduxjs/toolkit";
import { rankingData } from "../data/mockRanking";

const initialState = rankingData;

export const rankingSlice = createSlice({
	name: "ranking",
	initialState,
	reducers: {
		updateScore: (state, action) => {
			const { id, score } = action.payload;
			const player = state.find((p) => p.id === id);
			if (player) {
				player.score = score;
			}
		},
		addPlayer: (state, action) => {
			state.push(action.payload);
		},
	},
});

export const { updateScore, addPlayer } = rankingSlice.actions;

export default rankingSlice.reducer;
