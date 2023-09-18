import { AnyAction, Dispatch, Middleware, MiddlewareAPI, configureStore } from '@reduxjs/toolkit';

import { authApi, boardsApi, usersApi } from '@Rtk';
import appReducer, { fetching } from './api/fetchingSlice';

const fetchMiddleeware: Middleware<unknown, unknown, Dispatch<AnyAction>> =
  (store: MiddlewareAPI<Dispatch<AnyAction>>) =>
  (next: Dispatch<AnyAction>) =>
  (action: AnyAction) => {
    if (action.type.endsWith('pending')) {
      store.dispatch(fetching(true));
    } else if (action.type.endsWith('fulfilled')) {
      store.dispatch(fetching(false));
    }
    return next(action);
  };

const store = configureStore({
  reducer: {
    app: appReducer,
    [authApi.reducerPath]: authApi.reducer,
    [boardsApi.reducerPath]: boardsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(usersApi.middleware)
      .concat(boardsApi.middleware)
      .concat(fetchMiddleeware),
});

export type RootState = ReturnType<typeof store.getState>;

export { store };
