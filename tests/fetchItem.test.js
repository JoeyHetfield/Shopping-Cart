require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Testar se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function')
  })
  it('Execute a função fetchItem com o argumento do item MLB1615760527 e teste se fetch foi chamada;', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1)
  })
  it('com o argumento do item MLB1615760527, a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527')
  })
  it('é uma estrutura de dados igual ao objeto item que já está importado no arquivo', async () => {
    const teste = await fetchItem('MLB1615760527');
    expect(teste).toEqual(item)
  })
  it('Se chamar a função sem argumento retorna um erro com a mensagem You must provide an url', async () => {
    try{
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'))
    }
  });
});
