import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import inventoryReducer from './inventory';
import reviewReducer from './review';
import orderReducer from './order';
import cartReducer from './cart';
import cartItemReducer from './cartItem';

const rootReducer = combineReducers({
  session: sessionReducer,
  inventory: inventoryReducer,
  review: reviewReducer,
  order: orderReducer,
  cart: cartReducer,
  cartItem: cartItemReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
