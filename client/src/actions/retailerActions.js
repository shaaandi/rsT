import axios from "axios";
import {
  LOAD_RETAILER,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_RETAILER,
  FLASH,
  UNFLASH,
  FETCH_RETAILER_PRODUCTS,
  UPDATE_RETAILER_ORDERS
} from "./constants";

export const updateRetailer = data => async dispatch => {
  await dispatch({
    type: FLASH,
    payload: null
  });
  let user = await axios.post("/api/retailer", {
    name: data.name,
    address: data.address
  });
  await dispatch({
    type: UPDATE_RETAILER,
    payload: user.data
  });
  dispatch({
    type: UNFLASH,
    payload: null
  });
};

export const fetchRetailer = () => async dispatch => {
  await dispatch({
    type: FLASH,
    payload: null
  });
  let retailer = await axios.get("/api/retailer");
  await dispatch({
    type: LOAD_RETAILER,
    payload: retailer.data
  });
  await dispatch({
    type: UNFLASH,
    payload: null
  });
  return;
};

export const fetchRetailerProducts = (pageNum = 1) => async dispatch => {
  dispatch({
    type: FLASH,
    payload: null
  });
  let query = ``;
  query += `pageNum=${pageNum}`;
  let products = await axios.get(`/api/retailer/products?${query}`);
  await dispatch({
    type: FETCH_RETAILER_PRODUCTS,
    payload: products.data
  });
  await dispatch({
    type: UNFLASH,
    payload: null
  });
  return products.data;
};

export const addProduct = (data, url, method) => async dispatch => {
  await dispatch({
    type: FLASH,
    payload: null
  });
  let product = await axios({
    method: method,
    url: url,
    data: data
  });
  if (method === "POST") {
    await dispatch({
      type: ADD_PRODUCT,
      payload: product.data
    });
  } else if (method === "PUT") {
    await dispatch({
      type: EDIT_PRODUCT,
      payload: product.data
    });
  }
  await dispatch({
    type: UNFLASH,
    payload: null
  });
  if (method === "PUT") return product.data;
  else return;
};

export const deleteProduct = id => async dispatch => {
  await dispatch({
    type: FLASH,
    payload: null
  });
  await axios({
    method: "DELETE",
    url: "/api/retailer/inventory",
    data: {
      id: id
    }
  });
  await dispatch({
    type: DELETE_PRODUCT,
    payload: {
      id: id
    }
  });
  await dispatch({
    type: UNFLASH,
    payload: null
  });
  return;
};

export const fetchRetailerOrder = id => async dispatch => {
  await dispatch({
    type: FLASH,
    payload: null
  });
  let response = await axios.get(`/api/retailer/order/${id}`);
  dispatch({
    type: UNFLASH,
    payload: null
  });
  return response.data;
};

export const fetchRetailerOrders = () => async dispatch => {
  dispatch({
    type: FLASH,
    payload: null
  });
  let orders = await axios.get("/api/retailer/orders");
  await dispatch({
    type: FETCH_RETAILER_PRODUCTS,
    payload: orders.data
  });
  await dispatch({
    type: UNFLASH,
    payload: null
  });
  return orders.data;
};

export const selectRetailerOrderService = (
  orderId,
  serviceId
) => async dispatch => {
  await dispatch({
    type: FLASH,
    payload: null
  });
  let updatedOrder = await axios.put(`/api/retailer/order/${orderId}`, {
    serviceId: serviceId
  });
  await dispatch({
    type: UPDATE_RETAILER_ORDERS,
    payload: updatedOrder.data
  });
  await dispatch({
    type: UNFLASH,
    payload: null
  });
  return updatedOrder.data;
};
