import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userRedux from "./userRedux";
import continentRedux from "./continentRedux";
import countryRedux from "./countryRedux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cityRedux from "./cityRedux";
import categoryRedux from "./categoryRedux";
import typesRedux from "./typesRedux";
import unitRedux from "./unitRedux";
import logoRedux from "./logoRedux";
import imageredux from "./imageRedux";
import userListRedux from "./userListRedux";
import emailRedux from "./emailRedux";
import fNameRedux from "./fNameRedux.js";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userRedux,
  continent: continentRedux,
  country: countryRedux,
  city: cityRedux,
  category: categoryRedux,
  type: typesRedux,
  unit: unitRedux,
  logo: logoRedux,
  image: imageredux,
  userList: userListRedux,
  email: emailRedux,
  firstName: fNameRedux,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export let persistor = persistStore(store);
