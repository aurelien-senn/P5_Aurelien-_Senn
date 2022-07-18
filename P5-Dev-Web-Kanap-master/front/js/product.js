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
            baliseOption[i].innerHTML=productList.colors;
            i++;
        }
        
   //add name description price
document.getElementById('title').innerHTML+=`${productList.name}`;
document.getElementById('description').innerHTML+=`${productList.description}`;
document.getElementById('price').innerHTML+=`${productList.price}`;

    })
  //////////////////////
  //     add cart     //
  //////////////////////


  const elt= document.getElementById('addToCart');
  elt.addEventListener('click',function(){
    var quantityChoose = document.getElementById('quantity').value;
    var colorChoose = document.getElementById('colors').value;
    console.log(quantityChoose);
    console.log(colorChoose);
    localStorage.setItem("idUrl", "quantityChoose", "colorChoose");
        console.log(idUrl);
       var bla= localStorage.getItem("quantityChoose");
       console.log(quantityChoose);
  })