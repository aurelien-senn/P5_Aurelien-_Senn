// recueration id dans url
var urlProduct= document.location.href;
var url = new URL(urlProduct);
var idUrl= url.searchParams.get("id");

function afficherImageProduct(){
    
}

fetch("http://localhost:3000/api/products/"+idUrl)
    .then(function (data) {
        if (data.ok) {
            return data.json();
        }
    })


  .then(function (productList) {
    //ajout balise <img>
    let imageProduct = document.createElement('img');
    const classProductHtml = document.querySelector('.item__img');
    classProductHtml.prepend(imageProduct);
    //ajout des attribut src et alt
    const baliseImage = classProductHtml.childNodes[0];
    baliseImage.setAttribute("src",productList.imageUrl);
    baliseImage.setAttribute("alt",productList.altTxt);
    // text title price description
    let nodeTitle =document.querySelector('title');
    console.log(nodeTitle);
    console.log(productList.name);
    nodeTitle.appendChild(productList.name);
    document.querySelector('description').appendChild(productList.description);
    document.querySelector('price').appendChild(productList.price);
    
    }
            )
    