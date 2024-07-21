// src/actions.js
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';

export const fetchProducts = () => async dispatch => {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();

  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};

export const addToCart = product => ({
  type: ADD_TO_CART,
  payload: product,
});

export const incrementQuantity = productId => ({
  type: INCREMENT_QUANTITY,
  payload: productId,
});

export const decrementQuantity = productId => ({
  type: DECREMENT_QUANTITY,
  payload: productId,
});
