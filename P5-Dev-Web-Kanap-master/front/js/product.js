// recuperation id dans url
var urlProduct = document.location.href;
var url = new URL(urlProduct);
var idUrl = url.searchParams.get("id");

//confirm  to index or cart
function confirmCartOrIndex() {
    if (confirm("article ajouté avec succès au panier. souhaitez-vous aller au panier?")) {
        document.location.href = `cart.html`;
    } else {
        document.location.href = `index.html`;
    }
}

//regex for between 1 to 100



//recupere array d un produit
async function fetchProductJSON() {
    const response = await fetch("http://localhost:3000/api/products/" + idUrl);
    const productList = await response.json();
    return productList;
}


fetchProductJSON().then(productList => {
    //insere le produit dans la page

    //add balise <img>
    let imageProduct = document.createElement('img');
    const classProductImgHtml = document.querySelector('.item__img');
    classProductImgHtml.prepend(imageProduct);
    //add attribut src and alt
    const baliseImage = classProductImgHtml.childNodes[0];
    baliseImage.setAttribute("src", productList.imageUrl);
    baliseImage.setAttribute("alt", productList.altTxt);
    //add option+color
    const classProductcolorsHtml = document.querySelector('#colors');
    let i = 1
    for (productList.colors of productList.colors) {
        //add balise options
        let colorsProduct = document.createElement('option');
        classProductcolorsHtml.append(colorsProduct);
        // add values colors in balise option
        let baliseOption = document.getElementsByTagName('option');
        baliseOption[i].setAttribute("value", productList.colors);
        //add color in list
        baliseOption[i].innerHTML = productList.colors;
        i++;
    }
    function addElementById(variable1, variable2) {
        document.getElementById(variable1).textContent = variable2;
    }
    addElementById('title', productList.name);
    addElementById('description', productList.description);
    addElementById('price', productList.price);
})


//////////////////////
//     add cart     //
//////////////////////


const elt = document.getElementById('addToCart');
elt.addEventListener('click', function () {
    let quantityChoose = document.getElementById('quantity').value;
    let colorChoose = document.getElementById('colors').value;
    //array 
    let objetJson = {
        idProduct: idUrl,
        quantityItem: quantityChoose,
        colorItems: colorChoose
    };

    //conversion json ==> javascript
    let listLocalStorage = JSON.parse(localStorage.getItem('objetL'));
    console.log(listLocalStorage);

    function pushAndConfirmAddCart() {
        listLocalStorage.push(objetJson);
        localStorage.setItem("objetL", JSON.stringify(listLocalStorage));
        confirmCartOrIndex();
    
    }
    //regex for number between 1 to 100
    var bolRegexQuantity = (/^[1-9]$|^[1-9][0-9]$|^(100)$/.test(objetJson.quantityItem));
    // verification if quantity between 1 and 100
    if (bolRegexQuantity == false) {
        alert('Veuillez saisir une quantité entre 1 et 100');
    } else {
        //verification si cart dans localStorage et ajout produit dans localStorage
        if (objetJson.colorItems) {
            if (listLocalStorage) {
                let lengthtCart = listLocalStorage.length;
                console.log(lengthtCart);
                if (lengthtCart != 0) {
                    for (let i = 0; i + 1 <= lengthtCart; i++) {
                        if (listLocalStorage[i].idProduct == idUrl && listLocalStorage[i].colorItems == colorChoose) {
                            listLocalStorage[i].quantityItem = Number(listLocalStorage[i].quantityItem) + Number(objetJson.quantityItem);
                            localStorage.setItem("objetL", JSON.stringify(listLocalStorage));
                            confirmCartOrIndex();
                        } else if(i + 1 == lengthtCart) {
                            pushAndConfirmAddCart();
                        }
                    }

                }
                else {
                    pushAndConfirmAddCart();
                }
            }
            else {
                //create objet
                listLocalStorage = [];
                pushAndConfirmAddCart();

        } 
        } else {
            alert('veuillez selectionner une couleur');
        }
    }

})
