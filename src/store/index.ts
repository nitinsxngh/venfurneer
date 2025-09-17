import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "./reducers/cart";
import userReducer from "./reducers/user";

//COMBINING ALL REDUCERS
const reducer = {
  cart: cartReducer,
  user: userReducer,
};

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

let store: any;

const makeStore = ({ isServer }: { isServer: boolean }) => {
  if (isServer) {
    //If it's on server side, create a store
    return (store = configureStore({
      reducer,
    }));
  } else {
    //If it's on client side, create a store which will persist
    const persistConfig = {
      key: "shoppingcart",
      whitelist: ["cart", "user"], // only counter will be persisted, add other reducers if needed
      storage, // if needed, use a safer storage
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer); // Create a new reducer with our existing reducer

    store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [
              "persist/PERSIST",
              "persist/REHYDRATE",
              "persist/REGISTER",
              "persist/PAUSE",
              "persist/PURGE",
              "persist/FLUSH",
            ],
            ignoredPaths: ["__persistor"],
          },
        }),
    }); // Creating the store again

    // @ts-ignore:next-line
    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store;
  }
};

// export an assembled wrapper
// @ts-ignore:next-line
export const wrapper = createWrapper(makeStore, { debug: true });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UserSliceTypes}
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
