import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Items, PizzaSearchParametr } from './types';
//
//
//
//
//
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
