// recuperation id dans url
var urlProduct = document.location.href;
var url = new URL(urlProduct);
var idUrl = url.searchParams.get("id");

//confirm  to index or cart
function confirmCartOrIndex() {
    if (confirm("article ajouté avec succès au panier. souhaitez-vous aller au panier?")) {
        document.location.href = `cart.html`;
    } 
}

//regex for between 1 to 100

var productList;

//recupere array d un produit
async function fetchProductJSON() {
    const response = await fetch("http://localhost:3000/api/products/" + idUrl);
    const productList = await response.json();
    return productList;
}


    
fetchProductJSON().then(productList => {
    //add product in page if productList exist
   
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


//if problem with idUrl or backend
}).catch(function() {

    var nodeProductDelete=document.getElementsByTagName('article');
    console.log(nodeProductDelete[0]);
    nodeProductDelete[0].remove();
    var nodeParentMessageErreur = document.querySelector('.item');
    var p = document.createElement('p')
    p.setAttribute('id','messageErreur')
    p.textContent = "Ooops, il semble qu'il y ai un problème!!!";
    nodeParentMessageErreur.appendChild(p);
});

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
        //verification if color is select
        if (objetJson.colorItems) {
            //verificate if listLocalStorage exist
            if (listLocalStorage) {
                let lengthtCart = listLocalStorage.length;
                console.log(lengthtCart);
                //verificate if listLocalstorage isn't empty
                if (lengthtCart != 0) {
                    //find if product in listLocalStorage
                    for (let i = 0; i + 1 <= lengthtCart; i++) {
                        if (listLocalStorage[i].idProduct == idUrl && listLocalStorage[i].colorItems == colorChoose) {
                            listLocalStorage[i].quantityItem = Number(listLocalStorage[i].quantityItem) + Number(objetJson.quantityItem);
                            localStorage.setItem("objetL", JSON.stringify(listLocalStorage));
                            confirmCartOrIndex();
                            break;
                        }
                        else if(i + 1 == lengthtCart) {
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
let listLocalStorage = JSON.parse(localStorage.getItem('objetL'));
let quantityCart =0;
if (listLocalStorage){
    
    for (let i in listLocalStorage){
        quantityCart = quantityCart + parseInt(listLocalStorage[i].quantityItem);
    }
}
const li =document.getElementsByTagName('li');

li[4].textContent =`Panier (${quantityCart})`;