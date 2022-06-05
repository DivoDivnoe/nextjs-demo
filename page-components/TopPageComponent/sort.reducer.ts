import { SortEnum } from '../../components/Sort/Sort.props';
import { ProductModel } from '../../interfaces/product.interface';

export type SortActions =
  | { type: SortEnum.Rating }
  | { type: SortEnum.Price }
  | { type: 'update'; payload: ProductModel[] };

export interface SortReducerState {
  sort: SortEnum;
  products: ProductModel[];
}

export const sortReducer = (state: SortReducerState, action: SortActions): SortReducerState => {
  let products;

  switch (action.type) {
    case SortEnum.Rating:
      products = state.products.slice().sort((prev, next) => next.initialRating - prev.initialRating);
      return { sort: SortEnum.Rating, products };
    case SortEnum.Price:
      products = state.products.slice().sort((prev, next) => next.price - prev.price);
      return { sort: SortEnum.Price, products };
    case 'update':
      products = state.products.slice().sort((prev, next) => next.price - prev.price);
      return { sort: state.sort, products: action.payload };
    default:
      throw new Error('not valid action');
  }
};
