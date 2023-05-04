// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 
// Fique a vontade para modificar o código já escrito e criar suas próprias funções!
/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 * 
 */
  const cartItem = '.cart__item';
 const cartList = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

// Função para salvar o valor total do carrinho
const totalValue = async () => {
 const totalCart = document.querySelector('.total-price');
 let totalSum = 0;
 document.querySelectorAll(cartItem).forEach((item) => {
  totalSum += Number(item.innerHTML.split('$')[1]);
 });
 totalCart.innerHTML = `Valor Total: R$ ${Math.round((totalSum + Number.EPSILON) * 100) / 100} `;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.const { fetchItem } = require("./helpers/fetchItem");

 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const cartItemClickListener = (event) => {
    itemOnCart = document.querySelector(cartItem);
    event.target.remove(itemOnCart);
    localStorage.removeItem('cartItems');
    totalValue();
    
      // Ta removendo sempre o primeiro item e não o clicado
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

// Adicione cada elemento retornado da função createProductItemElement(product) como filho do elemento <section class="items">
// 
const elementsFromProducts = async (product) => {
  const waitElement = document.createElement('p');
  waitElement.classList.add('loading');
  waitElement.innerText = 'carregando...';
  const sectionItem = document.querySelector('.items');
  sectionItem.appendChild(waitElement);
  const objectsFromFecthProducts = await fetchProducts(product);
  const onlyResults = objectsFromFecthProducts.results;
  onlyResults.forEach((obj) => {
    sectionItem.appendChild(createProductItemElement(obj));
   });
   sectionItem.removeChild(waitElement);
};

// Clique do botão Adicionar ao carrinho
const addClickOnButton = () => {
  const btn = document.querySelectorAll('.item__add');
   btn.forEach((button) => button.addEventListener('click', async () => {
    const returnCarrinho = button.parentNode.firstChild.textContent;
    cartList.appendChild(createCartItemElement(await fetchItem(returnCarrinho)));
    saveCartItems(cartList.innerHTML);
    totalValue();
    }));
};

/* const addProductonCart = async (productCart) => {
  const carrinho = document.querySelector('.cart__items');
  const productFromList = await fetchItem(productCart);
  carrinho.appendChild(createCartItemElement(productFromList))

}
 */

// Remover todo carrinho clicando no botão

const removeBtn = document.querySelector('.empty-cart');
removeBtn.addEventListener('click', () => {
  cartList.innerHTML = '';
  localStorage.removeItem('cartItems');
  totalValue();
});

window.onload = async () => {
  await elementsFromProducts('computador');
  await addClickOnButton();
    
 // V Colocar os itens salvos no cart List, fazer a const pra pegar os itens indiv, e colocar o addEvent com cartItemClickListener
  if (getSavedCartItems()) {
    cartList.innerHTML = JSON.parse(getSavedCartItems()); 
    itemOnCart = document.querySelectorAll('.cart__item');
    itemOnCart.forEach((item) => item.addEventListener('click', cartItemClickListener));
   
    // itemOnCart.addEventListener('click', cartItemClickListener)
    // cartList.appendChild(createCartItemElement(JSON.parse(getSavedCartItems())))      
  }

  await totalValue();
};

/* const elementsFromProducts = async (product) => {
  const sectionItem = document.getElementsByClassName('items')
  const objectsFromFecthProducts = await fetchProducts(product);
  objectsFromFecthProducts.forEach((obj) => {
  const usingObj = createProductItemElement(obj);
  sectionItem.appendChild(usingObj)
})
}; */