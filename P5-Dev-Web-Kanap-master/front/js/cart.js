
let listLocalStorage = JSON.parse(localStorage.getItem('objetL'));
lengthlistLocalStorage = listLocalStorage.length;

let total = 0;
let totalQuantity = 0;

for (let i in listLocalStorage) {

  async function fetchlistLocalStorageJSON() {
    const response = await fetch("http://localhost:3000/api/products/" + listLocalStorage[i].idProduct);
    const product = await response.json();
    return product;
  }
  fetchlistLocalStorageJSON().then(product => {

    // creat div

    var article = document.createElement('article');
    const divCartItemImg = document.createElement('div');
    var img = document.createElement('img');
    const divCartItemContent = document.createElement('div');
    const divCartItemContentDescription = document.createElement('div');
    var h2 = document.createElement('h2');
    var pcolors = document.createElement('p');
    var pPrice = document.createElement('p');
    const divCartItemContentSettings = document.createElement('div');
    const divCartItemContentSettingsQuantity = document.createElement('div');
    var inputQuantity = document.createElement('input');
    const divCartItemContentSettingsDelete = document.createElement('div');
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
    const nodeArticle = document.getElementById("cart__items");
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
    divCartItemContentDescription.appendChild(pPrice);
    divCartItemContent.appendChild(divCartItemContentSettingsDelete);
    divCartItemContentSettingsDelete.appendChild(pDeleteItem);
    divCartItemContentSettings.appendChild(divCartItemContentSettingsQuantity);
    divCartItemContentSettingsQuantity.appendChild(pQuantity);
    divCartItemContentSettingsQuantity.appendChild(inputQuantity);

    h2.textContent = product.name;
    pcolors.textContent = listLocalStorage[i].colorItems;
    //calcul total par article
    var pricebyvanap = Number(listLocalStorage[i].quantityItem) * product.price;
    pPrice.textContent = pricebyvanap + " €";
    pQuantity.textContent = "Qté : ";
    pDeleteItem.textContent = "Supprimer";
    // calcul total et ajout
    total = total + pricebyvanap;
    totalQuantity = totalQuantity + Number(listLocalStorage[i].quantityItem);
    var nodeTotalPrice = document.getElementById("totalPrice");
    nodeTotalPrice.textContent = total;
    var nodeTotalquantity = document.getElementById("totalQuantity");
    nodeTotalquantity.textContent = totalQuantity;
    //suppression product cart
    pDeleteItem.addEventListener('click', () => {
      listLocalStorage.splice(i, 1);
      localStorage.setItem("objetL", JSON.stringify(listLocalStorage));
      document.location.reload(true);
    })
    //modifictaion quantity input
    inputQuantity.onchange = function () {
      var differencyQuantity = this.value - listLocalStorage[i].quantityItem;
      //change quantity in input
      listLocalStorage[i].quantityItem = this.value;
      localStorage.setItem("objetL", JSON.stringify(listLocalStorage));
      inputQuantity.setAttribute('value', listLocalStorage[i].quantityItem);
      //change price
      var oldPrice = pricebyvanap;
      pricebyvanap = Number(listLocalStorage[i].quantityItem) * product.price;
      pPrice.textContent = pricebyvanap + " €";
      //change quantity
      totalQuantity = totalQuantity + differencyQuantity;
      nodeTotalquantity.textContent = totalQuantity;
      //change total price
      total = total + pricebyvanap - oldPrice;
      nodeTotalPrice.textContent = total;
    }
  })


}
// form contact 
const contact = document.getElementById('order');
contact.addEventListener('click', function () {
  event.preventDefault();
  var contactTab = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    email: document.getElementById('email').value,
  };

  var bolFirstName = (/^[a-zA-Z\-]+$/.test(contactTab.firstName));
  var bollastName = /^[a-zA-Z\-]+$/.test(contactTab.lastName);
  var bolemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(contactTab.email);
  var boladdress = /^[a-zA-Z0-9\s,.'-]{3,}$/.test(contactTab.address);
  var bolcity = /^[a-zA-Z0-9\u00C0-\u00FF\s,. '-]{3,}$/.test(contactTab.city);
  // validate firstName

  if (bolFirstName) {
    firstNameErrorMsg.innerHTML = "";
  } else {
    firstNameErrorMsg.textContent = "ceci n\'est pas un prénom";
    event.preventDefault();
  }
  //validate email
  if (bolemail) {
    emailErrorMsg.innerHTML = "";
  } else {
    emailErrorMsg.textContent = "ceci n\'est pas un email";
    event.preventDefault();
  }
  //validate lastName
  if (bollastName) {
    lastNameErrorMsg.innerHTML = "";
  } else {
    lastNameErrorMsg.textContent = "ceci n\'est pas un nom";
    event.preventDefault();
  }
  // validate adress
  if (boladdress) {
    addressErrorMsg.innerHTML = "";
  } else {
    addressErrorMsg.textContent = "ceci n'est pas une adresse";
    event.preventDefault();
  }
  //validate city
  if (bolcity) {
    cityErrorMsg.innerHTML = "";
  } else {
    cityErrorMsg.textContent = "ceci n'est pas une ville";
    event.preventDefault()
  }



  var contact = contactTab;

  var products = [];
  for (let i in listLocalStorage) {
    let product = listLocalStorage[i].idProduct;
    products.push(product);
  }

  if (bolFirstName && bollastName && bolemail && boladdress && bolcity) {
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ contact, products })

    })
      .then((response) => {
        return response.json();
      })
      .then((server) => {
        orderId = server.orderId;
        console.log(orderId);
        document.location.href = `confirmation.html?id=${orderId}`;
      });
  }

})

