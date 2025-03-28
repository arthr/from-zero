import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";
import playerReducer from "./playerSlice";
import rankingReducer from "./rankingSlice";
import uiReducer from "./uiSlice";
import messagesReducer from "./messagesSlice";
import activitiesReducer from "./activitiesSlice";
import notificationsReducer from "./notificationsSlice";

export const store = configureStore({
	reducer: {
		game: gameReducer,
		player: playerReducer,
		ranking: rankingReducer,
		ui: uiReducer,
		messages: messagesReducer,
		activities: activitiesReducer,
		notifications: notificationsReducer,
	},
});

export default store;
