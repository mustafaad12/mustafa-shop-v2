// 8 addDecimal
export const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // 4 calculate item price
  state.itemsPrice = addDecimal(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
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

  return state;
};
