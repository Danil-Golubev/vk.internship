import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { card } from "../types";

export interface DataState {
  data: card[];
  loading: boolean;
  currentPage: number;
  error: string | null;
}

const initialState: DataState = {
  data: [],
  loading: false,
  currentPage: 1,
  error: null,
};

export const fetchGetItems = createAsyncThunk(
  "data/fetchGetItems",
  async (page: number) => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?_limit=14&_page=${page}`
    );
    return data;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.currentPage += 1;
    },
    updateItem: (state, action) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...action.payload };
      }
    },
    deleteItem: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchGetItems.fulfilled,
        (state, action: PayloadAction<card[]>) => {
          state.data = [...state.data, ...action.payload];
          state.loading = false;
        }
      )
      .addCase(fetchGetItems.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { updateItem, deleteItem, incrementPage } = dataSlice.actions;
export default dataSlice.reducer;
