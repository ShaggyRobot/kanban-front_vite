import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fetching: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    fetching: (state, action) => {
      state.fetching = action.payload;
    },
  },
});

export const { fetching } = appSlice.actions;
export default appSlice.reducer;
