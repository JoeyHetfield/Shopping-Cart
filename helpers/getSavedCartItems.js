const getSavedCartItems = () => {
   const recuperaStorage = localStorage.getItem('cartItems');
   return recuperaStorage;
  };

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
