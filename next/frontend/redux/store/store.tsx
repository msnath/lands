import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ApplicationFormReducer from "../reducers/ApplicationForm.reducer";

export type TReduxStore = ReturnType<typeof hydrateStore>;
export type TReduxState = ReturnType<typeof dummyStore.getState>;
export type TReduxDispatch = typeof dummyStore.dispatch;

let store: TReduxStore | null = null;

const AppReducer = combineReducers({
  ApplicationForm: ApplicationFormReducer,
});

const dummyStore = createStore(AppReducer);
export const InitialReduxState = dummyStore.getState();

const hydrateStore = (state?: TReduxState) =>
  createStore(
    AppReducer,
    state,
    composeWithDevTools({ trace: process.env.NODE_ENV === "development" })(
      applyMiddleware()
    )
  );

const initStore = (state?: TReduxState) => {
  let _store = store ?? hydrateStore(state);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (state && store) {
    _store = hydrateStore({ ...store.getState(), ...state });
    // Reset the current store
    store = null;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export const ReduxStore = { init: initStore };

export default ReduxStore;
