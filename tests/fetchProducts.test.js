require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Deve testar se é uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  })
  it('Execute a função fetchProducts com o argumento computador e teste se fetch foi chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1)
  })
  it('Testar se o retorno usando computador, utiliza o endpoint correto', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  })
  it('Testar se o retorno é igual ao ojb ccomputadorSearch', async () => {
    const teste = await fetchProducts('computador');
    await expect(teste).toEqual(computadorSearch)
  })
  it('Se chamar a função sem argumento retorna um erro com a mensagem You must provide an url', async () => {
    try{
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'))
    }
  });
});
