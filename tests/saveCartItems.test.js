const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado', () => {
    saveCartItems();
    expect(localStorage.setItem).toHaveBeenCalled()
  });
  it('o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro a chave cartItems e o segundo sendo o valor passado como argumento para saveCartItems', () => {
    saveCartItems(saveCartItems);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', JSON.stringify(saveCartItems))
  });
  
});
