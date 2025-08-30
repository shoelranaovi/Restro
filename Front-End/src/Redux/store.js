import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AuthSlice from "./AuthSlice";
import  ProductSlice  from "./ProductSlice";
import  ReservationSlice  from "./ReservationSlice";
import  cartSlice  from "./cartSlice";
import  AdddressSlice  from "./addressSlice";
import  OrderSlice  from "./orderSlice";
import  contactSlice  from "./contactlice";
import  adminSlice  from "./adminSlice";

const appReducer = combineReducers({
  auth: AuthSlice,
  product: ProductSlice,
  reservation: ReservationSlice,
  cart:cartSlice,
  address:AdddressSlice,
  order:OrderSlice,
  contacts:contactSlice,
  admin:adminSlice
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout/fulfilled" || action.type === "auth/resetStore") {
    // Clear persisted state manually
    storage.removeItem("persist:root"); // optional: clear localStorage
    state = undefined;
  }

  return appReducer(state, action);
};


const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
