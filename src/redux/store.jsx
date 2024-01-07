import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import loginSlice from "./slices/loginSlice";
import registerSlice from "./slices/registerSlice";
import currentUserSlice from "./slices/current-userSlice";
import profileSlice from "./slices/userProfileSlice";
import requestsSlice from "./slices/requestsSlice";
import barPurchaseRequest from "./slices/barPurchaseRequestSlice";
import customersSlice from "./slices/customersSlice";
import employeesSlice from "./slices/employeesSlice";
import barProductsSlice from "./slices/barProductsSlice";
import startupData from "./slices/startupSlice";

const store = configureStore({
  reducer: {
    currentuser: currentUserSlice,
    register: registerSlice,
    login: loginSlice,
    startup: startupData,
    userprofile: profileSlice,
    requests: requestsSlice,
    customers: customersSlice,
    employees: employeesSlice,
    barpurchaserequest: barPurchaseRequest,
    barproducts: barProductsSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
