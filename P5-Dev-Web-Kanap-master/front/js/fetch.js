
//fetch cart by id



  async function fetchProductJSON() {
    var response = await fetch("http://localhost:3000/api/products/" + idUrl);
    var productList = await response.json();
    return productList;
  }

  async function fetchlistLocalStorageJSON() {
    const response = await fetch("http://localhost:3000/api/products/" + listLocalStorage[i].idProduct);
    const product = await response.json();
    return product;
  }
