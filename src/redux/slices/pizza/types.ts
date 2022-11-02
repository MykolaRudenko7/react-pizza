export type Items = {
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

export interface PizzasSliceState {
  status: Status;
  items: Items[];
}

export type PizzaSearchParametr = {
  sortBy: string;
  sortOrd: string;
  category: string;
  search: string;
  currentPage: string;
};
