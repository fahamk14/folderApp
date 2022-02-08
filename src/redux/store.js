import { createStore } from 'redux'
import rootReducer from './Reducers'
import { persistReducer,persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig={
    key:"persist-root",
    storage
}

const persistedReducer=persistReducer(persistConfig,rootReducer)

const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(store)
export default store;