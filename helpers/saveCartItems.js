const saveCartItems = (itemToSave) => {
  localStorage.setItem('cartItems', JSON.stringify(itemToSave));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
