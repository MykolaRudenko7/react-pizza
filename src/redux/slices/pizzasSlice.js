import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params) => {
  const { sortBy, sortOrd, category, search, currentPage } = params;

  const { data } = await axios.get(
    `https://-633d7e23f2b0e623dc751a6a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${sortOrd}${search}`,
  );
  return data;
});

// state
const initialState = {
  status: 'loading',
  items: [],
};

// slice
export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  //  працівники
  reducers: {
   //  setItems(state, action) {
   //    state.items = action.payload;
   //  },
  },
  extraReducers: {
    // очікування
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
      console.log('loading');
    },
    //  успішно
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
      console.log('success');
    },
    //  відхилений
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
      console.log('was error');
    },
  },
});

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;

//
//
//
// await axios
//    .get(
//      `https://633d7e23f2b0e623dc751a6a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${sortOrd}${search}`,
//    )
//    .then((res) => {
//      setItems(res.data);
//      setIfLoading((ifLoading) => !ifLoading);
//    });
