import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

// 8 addDecimal
const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // 1 take item from action payload
      const item = action.payload;
      // 2 check if this item is already in the localstorage
      const existItem = state.cartItems.find((i) => i._id === item._id);

      //3 if the item as already in localstorage replace it with the same item from payload to update the changes such as qty
      if (existItem) {
        state.cartItems = state.cartItems.map((i) => {
          return i._id === existItem._id ? item : i;
        });
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // 4 calculate item price
      state.itemsPrice = addDecimal(
        state.cartItems.reducer((acc, item) => acc + item.price * item.qty)
      );

      // 5 calculate shipping price if price grater than 100$ 0$ else 15$
      state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 15);

      // 6 calculate tax price 15%
      state.taxPrice = addDecimal(0.15 * state.itemsPrice);

      // 7 calculat total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      // 9
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
