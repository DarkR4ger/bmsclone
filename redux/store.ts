import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import loadingReducer from './loadingSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer
  },
});

// Infer the 'RootState' and 'AppDispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
