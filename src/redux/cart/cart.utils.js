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

export const removeItemCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // if cartItem quanity is 1 remove it
  if (existingCartItem.quantity === 1) {
    // if true return it else remove it
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // if cartItem quantity is not 1 DECREASE IT
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
