const { createSlice } = require('@reduxjs/toolkit');

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showMiniCart: false,
    cartItems: [],
  },
  reducers: {
    showMiniCart(state) {
      state.showMiniCart = true;
    },

    hideMiniCart(state) {
        state.showMiniCart = false;
    },

    addToCart(state, action){
        // newItem = { id, product, quantity }
        const newItem = action.payload;
        const index = state.cartItems.findIndex((x)=> x.id === newItem.id);

        if (index >= 0) {
            state.cartItems[index].quantity += newItem.quantity;
        }else{
            //add to cart
            state.cartItems.push(newItem);
        }
    },
    setQuantity(state, action){
        const { id, quantity} = action.payload;
        //kiểm tra xem sản phẩm có sẵn trong giỏ hàng không
        const index = state.cartItems.findIndex((x)=> x.id === id)
        if (index >= 0) {
            state.cartItems[index].quantity = quantity;
        }
    },
    removeFromCart(state, action){
        const isNeedToRemove = action.payload
        state.cartItems = state.cartItems.filter((x) => x.id !== isNeedToRemove)
    },
  },
});

const { actions, reducer } = cartSlice;
export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFromCart } = actions; // named export
export default reducer; // default export
