import {
  LOAD_CUSTOMER,
  UPDATE_CUSTOMER,
  REMOVE_PRODUCT_FROM_WISHLIST,
  REMOVE_PRODUCT_FROM_CART,
  CART_QUANTITY_SETTER,
  FLASH,
  UNFLASH,
  FETCH_CUSTOMER_SECTION
} from "./constants";

import axios from "axios";
export const fetchCustomer = () => async dispatch => {
  await dispatch({
    type: FLASH,
    payload: null
  });
  let customer = await axios.get("/api/customer");
  await dispatch({
    type: LOAD_CUSTOMER,
    payload: customer.data
  });
  await dispatch({
    type: UNFLASH,
    payload: null
  });
  return;
};

export const updateCustomer = data => async dispatch => {
  await dispatch({
    type: FLASH,
    payload: null
  });
  let updatedCustomer = await axios.post("/api/customer", {
    name: data.name,
    address: data.address
  });
  await dispatch({
    type: UPDATE_CUSTOMER,
    payload: updatedCustomer.data
  });
  await dispatch({
    type: UNFLASH,
    payload: null
  });
};

export const addProductToWishlist = id => async dispatch => {
  await dispatch({
    type: FLASH,
    payload: null
  });
  await axios.post("/api/customer/wishlist", {
    id: id
  });
  await dispatch({
    type: UNFLASH,
    payload: null
  });
  return;
};

export const removeProductFromWishlist = id => async dispatch => {
  await dispatch({
    type: FLASH,
    payload: null
  });
  await axios({
    method: "DELETE",
    url: "/api/customer/wishlist",
    data: {
      id: id
    }
  });
  await dispatch({
    type: REMOVE_PRODUCT_FROM_WISHLIST,
    payload: id
  });
  await dispatch({
    type: UNFLASH,
    payload: null
  });
  return;
};

export const addProductToCart = (id, quantity = 1) => async dispatch => {
  await dispatch({
    type: FLASH,
    payload: null
  });
  await axios.post("/api/customer/cart", {
    id: id,
    quantity: quantity
  });
  await dispatch({
    type: UNFLASH,
    payload: null
  });
  return;
};

export const removeProductFromCart = id => async dispatch => {
  await dispatch({
    type: FLASH,
    payload: null
  });
  await axios({
    method: "DELETE",
    url: "/api/customer/cart",
    data: {
      id: id
    }
  });
  await dispatch({
    type: REMOVE_PRODUCT_FROM_CART,
    payload: id
  });
  await dispatch({
    type: UNFLASH,
    payload: null
  });
};

export const cartQuantitySetter = (id, mode) => async dispatch => {
  await dispatch({
    type: FLASH,
    payload: null
  });
  await axios({
    method: "PUT",
    url: "/api/customer/cart",
    data: {
      id: id,
      mode: mode
    }
  });
  await dispatch({
    type: CART_QUANTITY_SETTER,
    payload: {
      id,
      mode
    }
  });
  await dispatch({
    type: UNFLASH,
    payload: null
  });
};

export const handleToken = (token, amount) => async dispatch => {
  await dispatch({
    type: FLASH,
    payload: null
  });
  let response = await axios.post("/api/customer/order", {
    token: token,
    amount: amount
  });
  await dispatch({
    type: LOAD_CUSTOMER,
    payload: response.data
  });
  await dispatch({
    type: UNFLASH,
    payload: null
  });
  return;
};

export const fetchCustomerOrder = id => async dispatch => {
  await dispatch({
    type: FLASH,
    payload: null
  });
  let response = await axios.get(`/api/customer/order/${id}`);
  dispatch({
    type: UNFLASH,
    payload: null
  });
  return response.data;
};

export const fetchCustomerSection = section => async dispatch => {
  dispatch({
    type: FLASH,
    payload: null
  });
  let response = await axios.get(`/api/customer/${section}`);
  await dispatch({
    type: FETCH_CUSTOMER_SECTION,
    payload: {
      section: section,
      data: response.data
    }
  });
  await dispatch({
    type: UNFLASH,
    payload: null
  });
  return response.data;
};

export const fetchSimilarProducts = id => async dispatch => {
  let response = await axios.get(`/api/products/${id}/similarProducts`);
  return response.data;
};
