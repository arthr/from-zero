import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";
import playerReducer from "./playerSlice";
import chatReducer from "./chatSlice";
import rankingReducer from "./rankingSlice";

export const store = configureStore({
	reducer: {
		game: gameReducer,
		player: playerReducer,
		chat: chatReducer,
		ranking: rankingReducer,
	},
});
