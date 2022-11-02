import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPizzas } from './asyncActions';
import { Items, PizzasSliceState, Status } from './types';
//
//
//
//
//
// state

const initialState: PizzasSliceState = {
  status: Status.LOADING,
  items: [],
};

// slice
export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  //  працівники
  reducers: {
    setItems(state, action: PayloadAction<Items[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
//
//
//
// extraReducers: {
//   // очікування
//   [fetchPizzas.pending]: (state) => {
//     state.status = 'loading';
//     state.items = [];
//     console.log('loading');
//   },
//   //  успішно
//   [fetchPizzas.fulfilled]: (state, action) => {
//     state.items = action.payload;
//     state.status = 'success';
//     console.log('success');
//   },
//   //  відхилений
//   [fetchPizzas.rejected]: (state) => {
//     state.status = 'error';
//     state.items = [];
//     console.log('was error');
//   },
// },

