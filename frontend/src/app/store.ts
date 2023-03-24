import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/Login/userStore';
import movieReducer, {movieApi} from '../features/Movies/moviestore';

export const store = configureStore({
  reducer: {
    user: counterReducer,
    movie: movieReducer,
    // movie: movieApi.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;