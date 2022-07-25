




let listLocalStorage = JSON.parse(localStorage.getItem('objetL'));
console.log(listLocalStorage);
lengthlistLocalStorage = listLocalStorage.length;

let total = 0;
let totalQuantity = 0;

for (let i in listLocalStorage) {


  async function fetchMoviesJSON() {
    const response = await fetch("http://localhost:3000/api/products/" + listLocalStorage[i].idProduct);
    const product = await response.json();
    return product;
  }
  fetchMoviesJSON().then(product => {
    product;
    // creat div
    var article = document.createElement('article');
    var divCartItemImg = document.createElement('div');
    var img = document.createElement('img');
    var divCartItemContent = document.createElement('div');
    var divCartItemContentDescription = document.createElement('div');
    var h2 = document.createElement('h2');
    var pcolors = document.createElement('p');
    var pprice = document.createElement('p');
    var divCartItemContentSettings = document.createElement('div');
    var divCartItemContentSettingsQuantity = document.createElement('div');
    var inputQuantity = document.createElement('input');
    var divCartItemContentSettingsDelete = document.createElement('div');
    const pDeleteItem = document.createElement('p');
    var pQuantity = document.createElement('p');
    // add attribut article
    article.setAttribute('class', 'cart__item');
    article.setAttribute('data-id', listLocalStorage[i].idProduct);
    article.setAttribute('data-color', listLocalStorage[i].colorItems);
    // add attribut div
    divCartItemImg.setAttribute('class', 'cart__item__img');
    divCartItemContent.setAttribute('class', 'cart__item__content');
    divCartItemContentDescription.setAttribute('class', 'cart__item__content__description');
    divCartItemContentSettings.setAttribute('class', 'cart__item__content__settings');
    divCartItemContentSettingsQuantity.setAttribute('class', 'cart__item__content__settings__quantity');
    divCartItemContentSettingsDelete.setAttribute('class', 'cart__item__content__settings__delete');
    // add attribut img

    img.setAttribute('src', product.imageUrl);
    img.setAttribute('alt', product.altText);
    // add attribut input
    inputQuantity.setAttribute('type', 'number');
    inputQuantity.setAttribute('class', 'itemQuantity');
    inputQuantity.setAttribute('name', 'itemQuantity');
    inputQuantity.setAttribute('min', '1');
    inputQuantity.setAttribute('max', '100');
    inputQuantity.setAttribute('value', listLocalStorage[i].quantityItem);
    //Add attribut pDeleteItem
    pDeleteItem.setAttribute('class', 'deleteItem');
    // sel parent et ajout balise


    var nodeArticle = document.getElementById("cart__items");

    nodeArticle.appendChild(article);

    var nodeDivCartItem = document.getElementsByClassName("cart__item")[0];
    nodeDivCartItem.appendChild(divCartItemImg);

    article.appendChild(divCartItemImg);
    article.appendChild(divCartItemContent);
    divCartItemImg.appendChild(img);
    divCartItemContent.appendChild(divCartItemContentDescription);
    divCartItemContent.appendChild(divCartItemContentSettings);

    divCartItemContentDescription.appendChild(h2);
    divCartItemContentDescription.appendChild(pcolors);
    divCartItemContentDescription.appendChild(pprice);

    divCartItemContent.appendChild(divCartItemContentSettingsDelete);
    divCartItemContentSettingsDelete.appendChild(pDeleteItem);

    divCartItemContentSettings.appendChild(divCartItemContentSettingsQuantity);
    divCartItemContentSettingsQuantity.appendChild(pQuantity);
    divCartItemContentSettingsQuantity.appendChild(inputQuantity);

    h2.textContent = product.name;
    pcolors.textContent = listLocalStorage[i].colorItems;
    //calcul total par article
    var pricebyvanap = Number(listLocalStorage[i].quantityItem) * product.price;
    pprice.textContent = pricebyvanap + " €";
    pQuantity.textContent = "Qté : ";
    pDeleteItem.textContent = "Supprimer";
    // calcul total et ajout
    total = total + pricebyvanap;
    totalQuantity = totalQuantity + Number(listLocalStorage[i].quantityItem);

    var nodeTotal = document.getElementById("totalPrice");
    nodeTotal.textContent = total;
    var nodeTotal = document.getElementById("totalQuantity");
    nodeTotal.textContent = totalQuantity;

    //suppression product cart
    pDeleteItem.addEventListener('click', () => {
      listLocalStorage.splice(i, 1);
      localStorage.setItem("objetL", JSON.stringify(listLocalStorage));
      document.location.reload(true);

    

      })

    })





  }






