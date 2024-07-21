// src/reducers.js
import {combineReducers} from 'redux';
import {
  FETCH_PRODUCTS,
  ADD_TO_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
} from './action';

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
};

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const productExists = state.find(item => item.id === action.payload.id);
      if (productExists) {
        return state.map(item =>
          item.id === action.payload.id
            ? {...item, quantity: item.quantity + 1}
            : item,
        );
      }
      return [...state, {...action.payload, quantity: 1}];
    case INCREMENT_QUANTITY:
      return state.map(item =>
        item.id === action.payload
          ? {...item, quantity: item.quantity + 1}
          : item,
      );
    case DECREMENT_QUANTITY:
      return state.map(item =>
        item.id === action.payload && item.quantity > 0
          ? {...item, quantity: item.quantity - 1}
          : item,
      );
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

export default rootReducer;
