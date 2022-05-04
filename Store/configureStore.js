import { createStore, combineReducers } from "redux";
import toggleFavorite from "./Reducers/favoriteReducer";
import setAvatar from "./Reducers/avatarReducers";
import { persistCombineReducers } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

export default createStore(
  persistCombineReducers(persistConfig, { toggleFavorite, setAvatar })
);
