import userReducer from '../components/auth/userSlice';
import cartReducer from '../components/Cart/CartSlice';

const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {
  user: userReducer,
  cart: cartReducer,

};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
