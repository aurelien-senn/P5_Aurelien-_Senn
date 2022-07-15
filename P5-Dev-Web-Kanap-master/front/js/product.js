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
        //ajout balise <img>
        console.log(productList);
        let imageProduct = document.createElement('img');
        const classProductImgHtml = document.querySelector('.item__img');
        classProductImgHtml.prepend(imageProduct);
        //ajout des attribut src et alt
        const baliseImage = classProductImgHtml.childNodes[0];
        baliseImage.setAttribute("src", productList.imageUrl);
        baliseImage.setAttribute("alt", productList.altTxt);
        //option+color
        const classProductcolorsHtml = document.querySelector('#colors');
        let i = 1
        for (productList.colors of productList.colors) {
            //ajout des balise options
            let colorsProduct = document.createElement('option');
            classProductcolorsHtml.append(colorsProduct);
            // ajout des options couleurs
            let baliseOption = document.getElementsByTagName('option');
            baliseOption[i].setAttribute("value", productList.colors);
            console.log(productList.colors);
            i++;
        }

    })