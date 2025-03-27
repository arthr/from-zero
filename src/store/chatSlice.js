import { createSlice } from "@reduxjs/toolkit";
import { chatData } from "../data/mockChat";

const initialState = chatData;

export const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		addMessage: (state, action) => {
			state.messages.push(action.payload);
		},
		clearMessages: (state) => {
			state.messages = [];
		},
	},
});

export const { addMessage, clearMessages } = chatSlice.actions;

export default chatSlice.reducer;
