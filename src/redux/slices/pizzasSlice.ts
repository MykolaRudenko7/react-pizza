import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
//
//
//
export type PizzaSearchParametr = {
  sortBy: string;
  sortOrd: string;
  category: string;
  search: string;
  currentPage: string;
};

export const fetchPizzas = createAsyncThunk<Items[], PizzaSearchParametr>(
  'pizzas/fetchPizzasStatus',
  async (params) => {
    const { sortBy, sortOrd, category, search, currentPage } = params;

    const { data } = await axios.get<Items[]>(
      `https://633d7e23f2b0e623dc751a6a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${sortOrd}${search}`,
    );
    return data; // або as Items[]
  },
);

// state

type Items = {
  id: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  imageUrl: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error ',
}

interface PizzasSliceState {
  status: Status;
  items: Items[];
}

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

export const pizzasSelector = (state: RootState) => state.pizzas;
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
