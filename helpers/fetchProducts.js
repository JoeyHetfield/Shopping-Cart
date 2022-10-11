const fetchProducts = async (product) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

// fetchProducts('computador')