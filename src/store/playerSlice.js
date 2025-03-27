import { createSlice } from "@reduxjs/toolkit";
import { playerData } from "../data/mockPlayer";

const initialState = playerData;

export const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        updateHealth: (state, action) => {
            state.health = action.payload;
        },
        updateEnergy: (state, action) => {
            state.energy = action.payload;
        },
        updateXp: (state, action) => {
            state.xp = action.payload;
        },
        levelUp: (state) => {
            state.level += 1;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
    },
});

export const { updateHealth, updateEnergy, updateXp, levelUp, setName } =
    playerSlice.actions;

export default playerSlice.reducer;
