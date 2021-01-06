// cartItems - existing cartItem array
// cartItemToAdd - new Item
export const addItemToCart = (cartItems, cartItemToAdd) => {
  // will return a boolean whether the cartItemToAdd.id matches any existing cartItem.id in the current cartItems array
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // return a new a array
  // gives the  cartItemToAdd  (NEW ITEM) a quanity property get added the first time when the IF block does not run
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
