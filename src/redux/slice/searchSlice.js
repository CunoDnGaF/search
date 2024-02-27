import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
  search: ''
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeSearchField(state, action) {
      state.search = action.payload;
    },
    searchLoading(state) {
      state.loading = true;
    },
    searchSuccess(state, action) {
      state.loading = false;
      state.items = action.payload;
    },
    searchError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  }
})

export const {changeSearchField, searchLoading, searchSuccess, searchError} = searchSlice.actions;
export default searchSlice.reducer;