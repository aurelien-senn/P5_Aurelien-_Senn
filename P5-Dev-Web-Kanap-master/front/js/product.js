// recuperation id dans url
var urlProduct = document.location.href;
var url = new URL(urlProduct);
var idUrl = url.searchParams.get("id");




//recupere array d un produit
fetch("http://localhost:3000/api/products/" + idUrl)
    .then(function (data) {
        if (data.ok) {
            return data.json();
        }
    })


    //insere le produit dans la page
    .then(function (productList) {
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
        //         let variable1;
        //         let variable2;
        // function addElementById(variable1,variable2){
        //     document.getElementById('variable1').innerHTML += `${variable2}`;
        // }
        // addElementById(title,productList.name);
        // addElementById(description,productList.description);
        // addElementById(price,productList.price);

        //  add name description price
        document.getElementById('title').innerHTML += `${productList.name}`;
        document.getElementById('description').innerHTML += `${productList.description}`;
        document.getElementById('price').innerHTML += `${productList.price}`;

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
    let produitEnregistreDansLeLocalStorage = JSON.parse(localStorage.getItem('objetL'));


    //verification si cart dans localStorage et ajout produit dans localStorage
    if (produitEnregistreDansLeLocalStorage) {
        console.log(produitEnregistreDansLeLocalStorage);
        let lengthCart = produitEnregistreDansLeLocalStorage.length;

        for (let i = 0; i <= lengthCart; i++) {

            if (objetJson.idProduct == produitEnregistreDansLeLocalStorage[i].idProduct && objetJson.colorItems == produitEnregistreDansLeLocalStorage[i].colorItems) {
                let quantityCartProduct = Number(objetJson.quantityItem);
                let quantityAddProduct = Number(produitEnregistreDansLeLocalStorage.quantityItem);
                objetJson.quantityItem = quantityCartProduct + quantityAddProduct;
                
                objetJson.push(objetJson.quantityItem);
                // localStorage.removeItem("prenom");

                break;
            }

            else if (i == lengthCart) {
                // add new item
                produitEnregistreDansLeLocalStorage.push(objetJson);
                localStorage.setItem("objetL", JSON.stringify(produitEnregistreDansLeLocalStorage));
            }
        }
    }

    else {
        produitEnregistreDansLeLocalStorage = [];
        produitEnregistreDansLeLocalStorage.push(objetJson);
        localStorage.setItem("objetL", JSON.stringify(produitEnregistreDansLeLocalStorage));

    }

})
